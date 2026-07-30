import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-2">
        {label && <label className="block text-sm font-medium text-zinc-200" htmlFor={inputId}>{label}</label>}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error || helperText ? `${inputId}-hint` : undefined}
          className={cn(
            "h-11 w-full rounded-xl border bg-zinc-950 px-3 text-sm text-white outline-none transition placeholder:text-zinc-500 hover:border-white/20 focus:border-lime-300 focus:ring-2 focus:ring-lime-300/15 disabled:cursor-not-allowed disabled:opacity-60",
            error ? "border-rose-500" : "border-white/10",
            className,
          )}
          {...props}
        />
        {(error || helperText) && <p id={`${inputId}-hint`} className={cn("text-xs", error ? "text-rose-400" : "text-zinc-500")}>{error ?? helperText}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
