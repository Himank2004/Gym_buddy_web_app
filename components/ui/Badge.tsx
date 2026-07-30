import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "muscle" | "difficulty" | "equipment";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  muscle: "bg-violet-400/15 text-violet-200 ring-violet-300/20",
  difficulty: "bg-amber-400/15 text-amber-200 ring-amber-300/20",
  equipment: "bg-sky-400/15 text-sky-200 ring-sky-300/20",
};

export function Badge({ children, className, variant = "muscle", ...props }: BadgeProps) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1", variants[variant], className)} {...props}>{children}</span>;
}
