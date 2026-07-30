"use client";

const prompts = ["How can I improve my protein intake?", "Review today's calories", "Suggest a muscle gain diet", "What should I eat after workout?", "How do I lose fat while keeping muscle?"];

export function SuggestedPrompts({ onSelect, disabled }: { onSelect: (prompt: string) => void; disabled?: boolean }) {
  return <div className="flex flex-wrap gap-2">{prompts.map((prompt) => <button key={prompt} type="button" disabled={disabled} onClick={() => onSelect(prompt)} className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-left text-xs font-semibold text-zinc-300 transition hover:border-lime-300/30 hover:bg-lime-300/10 hover:text-lime-100 disabled:cursor-not-allowed disabled:opacity-50">{prompt}</button>)}</div>;
}
