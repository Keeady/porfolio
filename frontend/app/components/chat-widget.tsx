"use client";

import { useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

/**
 * Floating AI chat widget. Calls the FastAPI /api/chat SSE endpoint
 * directly from the browser, so this requires:
 *   1. NEXT_PUBLIC_BACKEND_URL set in .env.local (public — browser needs it)
 *   2. CORS enabled on the FastAPI backend for this frontend's origin
 *
 * Requires: lucide-react
 */

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

interface IChatWidget {
  url: string;
}

export default function ChatWidget({ url }: IChatWidget) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function sendMessage() {
    const text = input.trim();
    if (!url || !text || streaming) {
      return;
    }

    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "assistant", text: "" },
    ]);
    setStreaming(true);

    try {
      const res = await fetch(`${url}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok || !res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? ""; // keep incomplete trailing chunk

        for (const event of events) {
          const line = event.replace(/^data:\s*/, "").trim();
          if (!line || line === "[DONE]") continue;

          try {
            const { text: chunk } = JSON.parse(line);
            setMessages((prev) => {
              const next = [...prev];
              next[next.length - 1] = {
                role: "assistant",
                text: next[next.length - 1].text + chunk,
              };
              return next;
            });
            scrollRef.current?.scrollTo({
              top: scrollRef.current.scrollHeight,
            });
          } catch {
            // ignore malformed SSE line
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          text: "Something went wrong reaching the agent. Try again in a moment.",
        };
        return next;
      });
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {open && (
        <div className="mb-3 flex h-[28rem] w-80 flex-col overflow-hidden rounded-lg border border-sky-900 bg-[#0A1B2E] shadow-2xl sm:w-96">
          {/* header */}
          <div className="flex items-center justify-between border-b border-sky-950/60 px-4 py-3">
            <span className="text-sm font-semibold text-slate-100">
              Ask my AI agent
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-slate-400 hover:text-sky-300"
            >
              <X size={18} />
            </button>
          </div>

          {/* messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.length === 0 && (
              <p className="text-sm text-slate-500">
                Ask about my projects, skills, or experience — grounded in my
                actual portfolio data.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-sky-500 text-[#040B14]"
                    : "bg-[#0F2540] text-slate-200"
                }`}
              >
                {m.text || (streaming && i === messages.length - 1 ? "…" : "")}
              </div>
            ))}
          </div>

          {/* input */}
          <div className="flex items-center gap-2 border-t border-sky-950/60 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask a question…"
              className="flex-1 rounded-md border border-sky-900 bg-[#040B14] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
            />
            <button
              onClick={sendMessage}
              disabled={streaming || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-400 text-[#040B14] transition-opacity disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* launcher button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-400 text-[#040B14] shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
