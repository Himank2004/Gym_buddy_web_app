import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-lime-300 text-zinc-950 shadow-lg shadow-lime-300/10 hover:bg-lime-200",
  secondary: "border border-white/10 bg-white/8 text-white hover:border-white/20 hover:bg-white/12",
  ghost: "text-zinc-300 hover:bg-white/8 hover:text-white",
  danger: "bg-rose-500 text-white shadow-lg shadow-rose-500/10 hover:bg-rose-400",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex h-11 shrink-0 items-center justify-center rounded-xl px-4 text-sm font-bold whitespace-nowrap transition duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
