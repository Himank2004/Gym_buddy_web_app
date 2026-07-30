import { Dumbbell, Flame, Footprints, Salad, Wheat, Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface TodaySummaryProps {
  calories: number;
  calorieGoal: number;
  protein: number;
  proteinGoal: number;
  carbs: number;
  carbsGoal: number;
  fats: number;
  fatsGoal: number;
  workouts: number;
  streak: number;
}

export function TodaySummary({ calories, calorieGoal, protein, proteinGoal, carbs, carbsGoal, fats, fatsGoal, workouts, streak }: TodaySummaryProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <Card><div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-zinc-300">Daily calories</p><p className="mt-1 text-2xl font-black text-white">{Math.round(calories).toLocaleString()} <span className="text-sm font-medium text-zinc-500">/ {calorieGoal} kcal</span></p></div><Flame className="size-5 text-amber-200" /></div><ProgressBar className="mt-5" value={calories} max={calorieGoal} /></Card>
      <Card><div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-zinc-300">Protein</p><p className="mt-1 text-2xl font-black text-white">{Math.round(protein)}<span className="text-sm font-medium text-zinc-500"> / {proteinGoal} g</span></p></div><Salad className="size-5 text-sky-200" /></div><ProgressBar className="mt-5" value={protein} max={proteinGoal} /></Card>
      <Card><div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-zinc-300">Carbs</p><p className="mt-1 text-2xl font-black text-white">{Math.round(carbs)}<span className="text-sm font-medium text-zinc-500"> / {carbsGoal} g</span></p></div><Wheat className="size-5 text-violet-200" /></div><ProgressBar className="mt-5" value={carbs} max={carbsGoal} /></Card>
      <Card><div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-zinc-300">Fats</p><p className="mt-1 text-2xl font-black text-white">{Math.round(fats)}<span className="text-sm font-medium text-zinc-500"> / {fatsGoal} g</span></p></div><Zap className="size-5 text-rose-200" /></div><ProgressBar className="mt-5" value={fats} max={fatsGoal} /></Card>
      <Card className="p-4"><Dumbbell className="size-5 text-lime-300" /><p className="mt-5 text-2xl font-black text-white">{workouts}</p><p className="mt-1 text-xs font-medium text-zinc-500">Today’s workout logs</p></Card><Card className="p-4"><Footprints className="size-5 text-violet-300" /><p className="mt-5 text-2xl font-black text-white">{streak}</p><p className="mt-1 text-xs font-medium text-zinc-500">Current day streak</p></Card>
    </section>
  );
}
