import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return <div className="min-w-0 space-y-2">{label && <label htmlFor={textareaId} className="block text-sm font-medium text-zinc-200">{label}</label>}<textarea ref={ref} id={textareaId} aria-invalid={Boolean(error)} aria-describedby={error || helperText ? `${textareaId}-hint` : undefined} className={cn("min-h-28 w-full resize-y rounded-xl border bg-zinc-950 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-500 hover:border-white/20 focus:border-lime-300 focus:ring-2 focus:ring-lime-300/15 disabled:cursor-not-allowed disabled:opacity-60", error ? "border-rose-500" : "border-white/10", className)} {...props} />{(error || helperText) && <p id={`${textareaId}-hint`} className={cn("text-xs", error ? "text-rose-400" : "text-zinc-500")}>{error ?? helperText}</p>}</div>;
  },
);

Textarea.displayName = "Textarea";
