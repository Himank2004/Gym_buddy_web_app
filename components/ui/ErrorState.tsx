import { CircleAlert } from "lucide-react";
import { type ReactNode } from "react";

interface ErrorStateProps { title?: string; description?: string; action?: ReactNode; }

export function ErrorState({ title = "Something went wrong", description = "Please try again in a moment.", action }: ErrorStateProps) {
  return <div className="flex flex-col items-center rounded-2xl border border-rose-400/20 bg-rose-400/5 px-6 py-10 text-center"><CircleAlert className="mb-4 size-8 text-rose-300" aria-hidden="true" /><h3 className="font-bold text-white">{title}</h3><p className="mt-1 max-w-sm text-sm text-zinc-400">{description}</p>{action && <div className="mt-5">{action}</div>}</div>;
}
