import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, label, error, helperText, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return <div className="min-w-0 space-y-2">{label && <label htmlFor={selectId} className="block text-sm font-medium text-zinc-200">{label}</label>}<select ref={ref} id={selectId} aria-invalid={Boolean(error)} aria-describedby={error || helperText ? `${selectId}-hint` : undefined} className={cn("h-11 w-full rounded-xl border bg-zinc-950 px-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-lime-300 focus:ring-2 focus:ring-lime-300/15 disabled:cursor-not-allowed disabled:opacity-60", error ? "border-rose-500" : "border-white/10", className)} {...props}>{children}</select>{(error || helperText) && <p id={`${selectId}-hint`} className={cn("text-xs", error ? "text-rose-400" : "text-zinc-500")}>{error ?? helperText}</p>}</div>;
  },
);

Select.displayName = "Select";
