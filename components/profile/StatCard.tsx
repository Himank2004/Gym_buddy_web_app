import { type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function StatCard({ label, value, icon: Icon, detail }: { label: string; value: string | number; icon: LucideIcon; detail?: string }) {
  return <Card className="p-4"><Icon className="size-5 text-lime-300" /><p className="mt-5 text-2xl font-black text-white">{value}</p><p className="mt-1 text-xs font-semibold text-zinc-400">{label}</p>{detail && <p className="mt-2 text-xs text-zinc-600">{detail}</p>}</Card>;
}
