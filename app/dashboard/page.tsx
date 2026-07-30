import { redirect } from "next/navigation";
import { MotivationCard } from "@/components/dashboard/MotivationCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TodaySummary } from "@/components/dashboard/TodaySummary";
import { ErrorState } from "@/components/ui/ErrorState";
import { calculateDailyCalories, calculateDailyCarbs, calculateDailyFats, calculateDailyProtein } from "@/lib/calculations";
import { getCurrentUser } from "@/lib/auth";
import { getTodayFoodLogs, getUserNutritionGoals } from "@/lib/nutrition";
import { getWorkoutStats } from "@/lib/progress";
import { getRecentWorkoutLogs, getUserWorkoutLogs } from "@/lib/workouts";

function formatActivityTime(date: Date) {
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return "Today";
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const date = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date());

  try {
    const [foodLogs, recentWorkouts, allWorkouts, workoutStats, goals] = await Promise.all([getTodayFoodLogs(user.id), getRecentWorkoutLogs(user.id, 3), getUserWorkoutLogs(user.id), getWorkoutStats(user.id), getUserNutritionGoals(user.id)]);
    const nutritionGoals = goals ?? { dailyCalorieGoal: 2200, dailyProteinGoal: 130, dailyCarbsGoal: 250, dailyFatsGoal: 70 };
    const workouts = recentWorkouts.map((log) => ({ name: log.exercise.name, detail: `${log.sets} sets · ${log.reps} reps · ${log.weightKg} kg`, time: formatActivityTime(log.performedAt) }));
    const foods = [...foodLogs].reverse().slice(0, 3).map((log) => ({ name: log.foodName, detail: `${Math.round(log.calories)} kcal · ${Math.round(log.proteinG)}g protein`, time: new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(log.consumedAt) }));
    const name = user.name?.split(" ")[0] ?? "Athlete";
    const motivation = workoutStats.workoutStreak ? `You’re on a ${workoutStats.workoutStreak}-day training streak. Keep forging the habit.` : allWorkouts.length ? "Your progress is built one logged session at a time." : "Your first workout is the start of a stronger routine.";

    return <div className="space-y-8"><section><p className="text-sm font-medium text-lime-300">{date}</p><h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Good to see you, {name}.</h1><p className="mt-2 text-zinc-400">Here’s the shape of your day so far.</p></section><TodaySummary calories={calculateDailyCalories(foodLogs)} calorieGoal={nutritionGoals.dailyCalorieGoal} protein={calculateDailyProtein(foodLogs)} proteinGoal={nutritionGoals.dailyProteinGoal} carbs={calculateDailyCarbs(foodLogs)} carbsGoal={nutritionGoals.dailyCarbsGoal} fats={calculateDailyFats(foodLogs)} fatsGoal={nutritionGoals.dailyFatsGoal} workouts={allWorkouts.filter((log) => log.performedAt.toDateString() === new Date().toDateString()).length} streak={workoutStats.workoutStreak} /><QuickActions /><RecentActivity workouts={workouts} foods={foods} /><MotivationCard message={motivation} /></div>;
  } catch {
    return <ErrorState title="Unable to load dashboard" description="Check your database connection and try again." />;
  }
}
