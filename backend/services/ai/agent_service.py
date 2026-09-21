"""
services/agent_service.py

The agent loop: send the conversation + tool definitions to Claude,
execute any tool calls it requests, feed results back, repeat until
Claude responds with plain text instead of a tool call — then stream
that final answer back to the caller.

Tool-resolution turns are NOT streamed (they're usually fast and there's
nothing user-facing to show yet); only the final answer streams, which
is what the chat UI actually needs for a responsive feel.

Error handling: this generator never raises. Every failure mode (rate
limits, connection issues, a broken tool call, a mid-stream drop) is
caught and turned into a user-facing message instead, so the SSE stream
always terminates cleanly and the route's "[DONE]" sentinel always fires.
Internals (stack traces, exception details) are logged server-side only —
never sent to the client.
"""

import logging
import os
from typing import AsyncGenerator

import anthropic

from services.ai.agent_tools import TOOL_DEFINITIONS, AgentToolExecutor
from services.projects.project_service import ProjectService

logger = logging.getLogger(__name__)

MODEL = "claude-sonnet-5"  # swap to claude-haiku-4-5-20251001 for lower cost/latency
MAX_TOOL_ITERATIONS = 5  # guards against a runaway tool-call loop

SYSTEM_PROMPT = """You are the AI assistant embedded in this \
portfolio site. Answer visitor questions about her projects, skills, and \
experience using the tools available to you — never invent project details \
that the tools don't return. If a question is unrelated to her work, say so \
briefly and redirect to what you can help with."""

GENERIC_ERROR_MESSAGE = (
    "Sorry, I ran into a problem answering that. Please try again in a moment."
)
RATE_LIMIT_MESSAGE = (
    "I'm getting a lot of questions right now — please try again in a few seconds."
)


class AgentService:
    def __init__(self, project_service: ProjectService):
        self._client = anthropic.AsyncAnthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
        self._tool_executor = AgentToolExecutor(project_service)

    async def stream_response(self, user_message: str) -> AsyncGenerator[str, None]:
        messages: list[dict] = [{"role": "user", "content": user_message}]

        # --- Tool-resolution phase (non-streamed) ---
        try:
            for _ in range(MAX_TOOL_ITERATIONS):
                response = await self._client.messages.create(
                    model=MODEL,
                    max_tokens=1024,
                    system=SYSTEM_PROMPT,
                    tools=TOOL_DEFINITIONS,
                    messages=messages,
                )

                if response.stop_reason != "tool_use":
                    break

                messages.append({"role": "assistant", "content": response.content})

                tool_results = []
                for block in response.content:
                    if block.type != "tool_use":
                        continue
                    try:
                        result = await self._tool_executor.execute(block.name, block.input)
                    except Exception:
                        # Don't crash the whole request over one bad tool call —
                        # feed the failure back so Claude can recover gracefully
                        # (e.g. apologize or try a different approach).
                        logger.exception("Tool execution failed: %s", block.name)
                        result = f"Error: the '{block.name}' tool failed to run."
                    tool_results.append(
                        {
                            "type": "tool_result",
                            "tool_use_id": block.id,
                            "content": result,
                        }
                    )
                messages.append({"role": "user", "content": tool_results})
            else:
                # Loop exhausted MAX_TOOL_ITERATIONS without a final answer.
                logger.warning("Agent hit max tool iterations without resolving.")
                yield (
                    "That question needed more lookups than I could complete. "
                    "Could you try asking it more specifically?"
                )
                return

        except anthropic.RateLimitError:
            logger.warning("Anthropic rate limit hit during tool resolution.")
            yield RATE_LIMIT_MESSAGE
            return
        except anthropic.AuthenticationError:
            logger.error("Anthropic authentication failed — check ANTHROPIC_API_KEY.")
            yield GENERIC_ERROR_MESSAGE
            return
        except (anthropic.APIConnectionError, anthropic.APITimeoutError):
            logger.error("Could not reach Anthropic API (connection/timeout).")
            yield GENERIC_ERROR_MESSAGE
            return
        except anthropic.APIStatusError:
            logger.exception("Anthropic API returned an error status.")
            yield GENERIC_ERROR_MESSAGE
            return
        except Exception:
            logger.exception("Unexpected error during tool-resolution phase.")
            yield GENERIC_ERROR_MESSAGE
            return

        # --- Final answer (streamed) ---
        try:
            async with self._client.messages.stream(
                model=MODEL,
                max_tokens=1024,
                system=SYSTEM_PROMPT,
                tools=TOOL_DEFINITIONS,
                messages=messages,
            ) as stream:
                async for text in stream.text_stream:
                    yield text

        except anthropic.RateLimitError:
            logger.warning("Anthropic rate limit hit during streaming.")
            yield f"\n\n_{RATE_LIMIT_MESSAGE}_"
        except (anthropic.APIConnectionError, anthropic.APITimeoutError):
            logger.error("Connection dropped while streaming the response.")
            yield "\n\n_The connection dropped before I could finish. Please try again._"
        except anthropic.APIStatusError:
            logger.exception("Anthropic API returned an error status during streaming.")
            yield f"\n\n_{GENERIC_ERROR_MESSAGE}_"
        except Exception:
            logger.exception("Unexpected error while streaming the final answer.")
            yield f"\n\n_{GENERIC_ERROR_MESSAGE}_"