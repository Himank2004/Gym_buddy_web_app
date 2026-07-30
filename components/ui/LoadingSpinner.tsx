import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingSpinner({ className, label = "Loading" }: { className?: string; label?: string }) {
  return <span className={cn("inline-flex items-center gap-2 text-sm text-zinc-400", className)} role="status"><LoaderCircle className="size-4 animate-spin text-lime-300" aria-hidden="true" />{label}<span className="sr-only">…</span></span>;
}
