"use client";

import { Bot } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatBubble, type ChatMessageItem } from "@/components/chatbot/ChatBubble";
import { ChatInput } from "@/components/chatbot/ChatInput";
import { SuggestedPrompts } from "@/components/chatbot/SuggestedPrompts";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

type ChatResponse = { message?: ChatMessageItem; error?: string };

export function ChatExperience({ initialMessages }: { initialMessages: ChatMessageItem[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, isLoading]);

  const sendMessage = async (content: string) => {
    const temporaryId = `pending-${Date.now()}`;
    setError(undefined); setIsLoading(true); setMessages((current) => [...current, { id: temporaryId, role: "user", content }]);
    try {
      const response = await fetch("/api/chatbot", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: content }) });
      const payload = await response.json().catch(() => ({})) as ChatResponse;
      if (!response.ok || !payload.message) { setError(payload.error ?? "Unable to get a response right now."); return false; }
      setMessages((current) => [...current, payload.message as ChatMessageItem]);
      return true;
    } catch { setError("Unable to get a response right now."); return false; } finally { setIsLoading(false); }
  };

  return <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/55 shadow-2xl shadow-black/15"><div className="flex items-center gap-3 border-b border-white/8 px-5 py-4"><span className="rounded-xl bg-lime-300/10 p-2 text-lime-300"><Bot className="size-5" /></span><div><h2 className="font-black text-white">FitForge Diet Bot</h2><p className="text-xs text-zinc-500">Your practical nutrition companion</p></div></div><div className="h-[28rem] space-y-5 overflow-y-auto scroll-smooth p-5 sm:p-6">{messages.length ? messages.map((message) => <ChatBubble key={message.id} message={message} />) : <EmptyState title="Start a conversation" description="Ask about your meals, macros, training, or fitness goal." />}{isLoading && <div className="flex gap-3"><span className="flex size-8 items-center justify-center rounded-xl bg-white/8 text-lime-300"><Bot className="size-4" /></span><span className="rounded-2xl rounded-tl-sm border border-white/8 bg-zinc-900 px-4 py-3"><LoadingSpinner label="Thinking" /></span></div>}<div ref={bottomRef} /></div>{error && <p className="mx-4 mb-3 rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200" role="alert">{error}</p>}<div className="border-t border-white/8 px-4 py-3 sm:px-5"><p className="mb-2 text-xs font-semibold text-zinc-500">Try asking</p><SuggestedPrompts onSelect={sendMessage} disabled={isLoading} /></div><ChatInput onSend={sendMessage} disabled={isLoading} /></div>;
}
