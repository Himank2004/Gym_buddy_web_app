import { type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface MacroCardProps { label: string; value: number; goal: number; unit: string; icon: LucideIcon; iconClassName: string; }

export function MacroCard({ label, value, goal, unit, icon: Icon, iconClassName }: MacroCardProps) {
  return <Card className="p-4"><div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-zinc-300">{label}</p><p className="mt-1 text-2xl font-black text-white">{Math.round(value)}<span className="ml-1 text-sm font-medium text-zinc-500">/ {goal} {unit}</span></p></div><span className={`rounded-xl p-2.5 ${iconClassName}`}><Icon className="size-5" /></span></div><ProgressBar className="mt-5" value={value} max={goal} /></Card>;
}
