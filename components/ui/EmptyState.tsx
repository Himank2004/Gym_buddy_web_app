import { Inbox } from "lucide-react";
import { type ReactNode } from "react";

interface EmptyStateProps { title: string; description?: string; action?: ReactNode; }

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return <div className="flex flex-col items-center rounded-2xl border border-dashed border-white/15 bg-white/3 px-6 py-10 text-center"><Inbox className="mb-4 size-8 text-lime-300" aria-hidden="true" /><h3 className="font-bold text-white">{title}</h3>{description && <p className="mt-1 max-w-sm text-sm text-zinc-400">{description}</p>}{action && <div className="mt-5">{action}</div>}</div>;
}
