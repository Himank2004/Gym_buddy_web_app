"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

export function ChatInput({ onSend, disabled }: { onSend: (message: string) => Promise<boolean>; disabled?: boolean }) {
  const [message, setMessage] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const content = message.trim(); if (!content || disabled) return; if (await onSend(content)) setMessage(""); };

  return <form onSubmit={submit} className="flex gap-2 border-t border-white/8 bg-zinc-950/90 p-3 sm:p-4"><label className="sr-only" htmlFor="chat-message">Message FitForge Diet Bot</label><textarea id="chat-message" value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder="Ask about meals, protein, or your goals..." rows={1} disabled={disabled} className="min-h-11 flex-1 resize-none rounded-xl border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-lime-300 focus:ring-2 focus:ring-lime-300/15 disabled:opacity-50" /><Button type="submit" className="h-11 w-11 shrink-0 px-0" disabled={disabled || !message.trim()} aria-label="Send message"><Send className="size-4" /></Button></form>;
}
