import type { FoodLog } from "@prisma/client";
import { Utensils } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { calculateDailyCalories, groupFoodLogsByMeal } from "@/lib/calculations";

export function MealBreakdown({ foodLogs }: { foodLogs: FoodLog[] }) {
  const meals = groupFoodLogsByMeal(foodLogs);
  const entries = Object.entries(meals);

  return <Card title="Meal breakdown" description="Your day, one meal at a time.">{entries.length ? <div className="space-y-3">{entries.map(([meal, logs]) => <div key={meal} className="flex items-center justify-between rounded-xl bg-white/4 px-3 py-3"><div className="flex items-center gap-2"><span className="rounded-lg bg-lime-300/10 p-1.5 text-lime-300"><Utensils className="size-3.5" /></span><div><p className="text-sm font-bold text-white">{meal}</p><p className="text-xs text-zinc-500">{logs.length} item{logs.length === 1 ? "" : "s"}</p></div></div><span className="text-sm font-bold text-zinc-200">{Math.round(calculateDailyCalories(logs))} kcal</span></div>)}</div> : <p className="text-sm text-zinc-500">Add food to see your meal breakdown.</p>}</Card>;
}
