import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function Card({ children, className, title, description }: CardProps) {
  return (
    <section className={cn("min-w-0 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/85 to-zinc-900/60 p-4 shadow-xl shadow-black/15 backdrop-blur sm:p-5", className)}>
      {(title || description) && (
        <header className="mb-5">
          {title && <h2 className="text-base font-bold text-white">{title}</h2>}
          {description && <p className="mt-1 text-sm leading-6 text-zinc-400">{description}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
