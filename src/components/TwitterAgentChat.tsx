"use client";

import { useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
type TwitterAgentChatProps = {
  handle: string;
  displayName?: string | null;
  profileImageUrl?: string | null;
  profileBio?: string | null;
  styleSummary?: string | null;
};

export default function TwitterAgentChat({
  handle,
  displayName,
  profileImageUrl,
  profileBio,
  styleSummary,
}: TwitterAgentChatProps) {
  const suggestedPrompts = useMemo(
    () => [
      `Introduce yourself as @${handle}'s agent.`,
      `What kind of vibe does @${handle} give off?`,
      `Summarize @${handle}'s Twitter voice.`,
    ],
    [handle],
  );

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { handle },
    }),
  });
  const [input, setInput] = useState("");

  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;
    sendMessage({ text: value });
    setInput("");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="border border-white/10 bg-black/30 p-5 backdrop-blur-md">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full border border-primary/30 bg-surface-container-high">
            {profileImageUrl ? (
              <img src={profileImageUrl} alt={`@${handle}`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-primary">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary">Agent Link</div>
            <h1 className="mt-1 font-headline text-3xl font-black italic tracking-tight text-zinc-100">
              {displayName || `@${handle}`}
            </h1>
            <div className="font-label text-xs uppercase tracking-[0.24em] text-primary">@{handle}</div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <div className="font-label text-[10px] uppercase tracking-[0.24em] text-zinc-500">Profile</div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              {profileBio || "No synced profile bio yet. The agent can still chat, but it has limited context."}
            </p>
          </div>

          <div>
            <div className="font-label text-[10px] uppercase tracking-[0.24em] text-zinc-500">Voice Model</div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              {styleSummary || "Waiting for synced Twitter style analysis."}
            </p>
          </div>
        </div>
      </aside>

      <section className="flex min-h-[70vh] flex-col border border-white/10 bg-[#06080d]/90">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <div className="font-label text-[10px] uppercase tracking-[0.32em] text-secondary">QR2 Agent Chat</div>
            <div className="mt-1 font-label text-xs uppercase tracking-[0.2em] text-zinc-500">
              Scanned profile: @{handle}
            </div>
          </div>
          <div className="flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.24em] text-primary">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(143,245,255,0.65)]" />
            Live
          </div>
        </div>

        <div className="border-b border-white/10 px-5 py-4">
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  setInput(prompt);
                }}
                className="border border-primary/20 bg-primary/5 px-3 py-2 text-left font-label text-[10px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/10"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          {messages.length === 0 && (
            <div className="border border-dashed border-white/10 bg-black/20 p-5 text-sm leading-relaxed text-zinc-400">
              Ask anything about @{handle}&apos;s public Twitter persona, communication style, or digital vibe.
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] border px-4 py-3 text-sm leading-relaxed ${message.role === "user"
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-white/10 bg-surface-container-high text-zinc-200"
                  }`}
              >
                {message.role === "assistant" && (
                  <div className="mb-2 font-label text-[10px] uppercase tracking-[0.24em] text-secondary">
                    @{handle} agent
                  </div>
                )}
                {message.parts.map((part, index) => (part.type === "text" ? <div key={index}>{part.text}</div> : null))}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="font-label text-[10px] uppercase tracking-[0.24em] text-primary">
              Agent is responding...
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="border-t border-white/10 p-5">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={status !== "ready"}
              placeholder={`Ask @${handle}'s agent...`}
              className="flex-1 border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-primary/40 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status !== "ready" || !input.trim()}
              className="bg-primary px-5 py-3 font-headline text-xs font-bold uppercase tracking-[0.18em] text-on-primary transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
