import { Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function InsightsCard({ insights }: { insights: string[] }) {
  return <Card title="Progress insights" description="A quick read on your current rhythm."><Lightbulb className="size-5 text-amber-200" />{insights.length ? <ul className="mt-4 space-y-3">{insights.map((insight) => <li key={insight} className="border-b border-white/8 pb-3 text-sm leading-6 text-zinc-300 last:border-0 last:pb-0">{insight}</li>)}</ul> : <p className="mt-4 text-sm text-zinc-500">Log workouts and meals to unlock personalized insights.</p>}</Card>;
}
