"""
services/agent_service.py

The agent loop: send the conversation + tool definitions to Claude,
execute any tool calls it requests, feed results back, repeat until
Claude responds with plain text instead of a tool call — then stream
that final answer back to the caller.

Tool-resolution turns are NOT streamed (they're usually fast and there's
nothing user-facing to show yet); only the final answer streams, which
is what the chat UI actually needs for a responsive feel.
"""

import os
from typing import AsyncGenerator

import anthropic

from services.ai.agent_tools import TOOL_DEFINITIONS, AgentToolExecutor
from services.projects.project_service import ProjectService

MODEL = "claude-sonnet-5"  # swap to claude-haiku-4-5-20251001 for lower cost/latency

SYSTEM_PROMPT = """You are the AI assistant embedded in Brianna B. Taylor's \
portfolio site. Answer visitor questions about her projects, skills, and \
experience using the tools available to you — never invent project details \
that the tools don't return. If a question is unrelated to her work, say so \
briefly and redirect to what you can help with."""


class AgentService:
    def __init__(self, project_service: ProjectService):
        self._client = anthropic.AsyncAnthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
        self._tool_executor = AgentToolExecutor(project_service)

    async def stream_response(self, user_message: str) -> AsyncGenerator[str, None]:
        messages: list[dict] = [{"role": "user", "content": user_message}]

        # Resolve any tool calls first (non-streamed) — usually 0-2 round trips.
        while True:
            response = await self._client.messages.create(
                model=MODEL,
                max_tokens=1024,
                system=SYSTEM_PROMPT,
                tools=TOOL_DEFINITIONS,
                messages=messages,
            )

            if response.stop_reason != "tool_use":
                # No tool call this turn — nothing left to resolve, break
                # out and stream this same turn again below for the UI.
                break

            messages.append({"role": "assistant", "content": response.content})

            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = await self._tool_executor.execute(block.name, block.input)
                    tool_results.append(
                        {
                            "type": "tool_result",
                            "tool_use_id": block.id,
                            "content": result,
                        }
                    )
            messages.append({"role": "user", "content": tool_results})

        # Final answer — stream this one for the chat UI.
        async with self._client.messages.stream(
            model=MODEL,
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            tools=TOOL_DEFINITIONS,
            messages=messages,
        ) as stream:
            async for text in stream.text_stream:
                yield text