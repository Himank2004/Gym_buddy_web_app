import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ value, max, label, className }: ProgressBarProps) {
  const percentage = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div className={cn("space-y-2", className)}>
      {label && <div className="flex justify-between text-sm"><span className="font-medium text-zinc-200">{label}</span><span className="text-zinc-500">{Math.round(percentage)}%</span></div>}
      <div className="h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
        <div className="h-full rounded-full bg-gradient-to-r from-lime-400 to-emerald-300 transition-[width] duration-300" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
