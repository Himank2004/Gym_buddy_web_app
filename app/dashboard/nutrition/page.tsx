import { Flame, Salad, Wheat, Zap } from "lucide-react";
import { AddFoodForm } from "@/components/nutrition/AddFoodForm";
import { FoodLogCard } from "@/components/nutrition/FoodLogCard";
import { MacroCard } from "@/components/nutrition/MacroCard";
import { MealBreakdown } from "@/components/nutrition/MealBreakdown";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { calculateDailyCalories, calculateDailyCarbs, calculateDailyFats, calculateDailyProtein } from "@/lib/calculations";
import { getCurrentUser } from "@/lib/auth";
import { getCommonFoodItems, getTodayFoodLogs, getUserNutritionGoals } from "@/lib/nutrition";

export default async function NutritionPage() {
  const user = await getCurrentUser();
  if (!user) return <ErrorState title="Session unavailable" description="Please sign in again to view your nutrition." />;

  try {
    const [foodLogs, foodItems, goals] = await Promise.all([getTodayFoodLogs(user.id), getCommonFoodItems(), getUserNutritionGoals(user.id)]);
    const calories = calculateDailyCalories(foodLogs); const protein = calculateDailyProtein(foodLogs); const carbs = calculateDailyCarbs(foodLogs); const fats = calculateDailyFats(foodLogs);
    const foods = foodItems.map(({ id, name, servingSize, calories: foodCalories, proteinG, carbsG, fatsG }) => ({ id, name, servingSize, calories: foodCalories, proteinG, carbsG, fatsG }));

    const nutritionGoals = goals ?? { dailyCalorieGoal: 2200, dailyProteinGoal: 130, dailyCarbsGoal: 250, dailyFatsGoal: 70 };
    return <div className="space-y-8"><section><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Fuel your progress</p><h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Nutrition tracker</h1><p className="mt-2 text-zinc-400">Log what you eat and stay aligned with your daily goals.</p></section><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MacroCard label="Calories" value={calories} goal={nutritionGoals.dailyCalorieGoal} unit="kcal" icon={Flame} iconClassName="bg-amber-300/10 text-amber-200" /><MacroCard label="Protein" value={protein} goal={nutritionGoals.dailyProteinGoal} unit="g" icon={Salad} iconClassName="bg-sky-300/10 text-sky-200" /><MacroCard label="Carbs" value={carbs} goal={nutritionGoals.dailyCarbsGoal} unit="g" icon={Wheat} iconClassName="bg-violet-300/10 text-violet-200" /><MacroCard label="Fats" value={fats} goal={nutritionGoals.dailyFatsGoal} unit="g" icon={Zap} iconClassName="bg-rose-300/10 text-rose-200" /></section><section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"><Card title="Add food" description="Search a common food or enter your own values."><AddFoodForm foods={foods} /></Card><MealBreakdown foodLogs={foodLogs} /></section><section><div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Today</p><h2 className="mt-1 text-2xl font-black text-white">Food logs</h2></div>{foodLogs.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{foodLogs.map((log) => <FoodLogCard key={log.id} {...log} />)}</div> : <EmptyState title="No food logged today" description="Add your first meal to start seeing your macro progress." />}</section></div>;
  } catch {
    return <ErrorState title="Unable to load nutrition" description="Check your database connection and try again." />;
  }
}
