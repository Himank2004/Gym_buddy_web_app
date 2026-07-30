import { Bot, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatMessageItem { id: string; role: "user" | "assistant"; content: string; }

export function ChatBubble({ message }: { message: ChatMessageItem }) {
  const isUser = message.role === "user";
  return <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}><div className={cn("mt-1 flex size-8 shrink-0 items-center justify-center rounded-xl", isUser ? "order-2 bg-lime-300 text-zinc-950" : "bg-white/8 text-lime-300")}><>{isUser ? <UserRound className="size-4" /> : <Bot className="size-4" />}</></div><p className={cn("max-w-[calc(100%-2.75rem)] break-words rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[70%]", isUser ? "order-1 rounded-tr-sm bg-lime-300 text-zinc-950" : "rounded-tl-sm border border-white/8 bg-zinc-900 text-zinc-200")}>{message.content}</p></div>;
}
