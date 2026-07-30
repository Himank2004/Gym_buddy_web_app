import { Dumbbell, Utensils } from "lucide-react";
import { Card } from "@/components/ui/Card";

export interface RecentWorkout { name: string; detail: string; time: string; }
export interface RecentFood { name: string; detail: string; time: string; }

interface RecentActivityProps { workouts: RecentWorkout[]; foods: RecentFood[]; }

function ActivityList({ title, items, kind }: { title: string; items: RecentWorkout[] | RecentFood[]; kind: "workout" | "food" }) {
  const Icon = kind === "workout" ? Dumbbell : Utensils;
  const iconClass = kind === "workout" ? "bg-lime-300/10 text-lime-300" : "bg-sky-300/10 text-sky-200";
  return <Card title={title}>{items.length ? items.map((item) => <div key={`${item.name}-${item.time}`} className="flex items-center gap-3 border-b border-white/7 py-3 last:border-0 last:pb-0 first:pt-0"><span className={`rounded-xl p-2 ${iconClass}`}><Icon className="size-4" /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-white">{item.name}</p><p className="truncate text-xs text-zinc-500">{item.detail}</p></div><time className="text-xs text-zinc-500">{item.time}</time></div>) : <p className="text-sm text-zinc-500">No {kind === "workout" ? "workouts" : "food logs"} yet.</p>}</Card>;
}

export function RecentActivity({ workouts, foods }: RecentActivityProps) {
  return <section className="grid gap-4 xl:grid-cols-2"><ActivityList title="Recent workouts" items={workouts} kind="workout" /><ActivityList title="Recent food logs" items={foods} kind="food" /></section>;
}
