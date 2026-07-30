import { Activity, Dumbbell, Layers3, Settings, Trophy, Utensils, Weight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ExerciseProgressPicker } from "@/components/profile/ExerciseProgressPicker";
import { InsightsCard } from "@/components/profile/InsightsCard";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { ProgressChart } from "@/components/profile/ProgressChart";
import { StatCard } from "@/components/profile/StatCard";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { getCurrentUser } from "@/lib/auth";
import { getUserProfile } from "@/lib/profile";
import { getCaloriesOverTime, getMuscleGroupDistribution, getNutritionStats, getProteinOverTime, getStrengthProgress, getWorkoutStats, getWorkoutVolumeOverTime } from "@/lib/progress";
import { getUserWorkoutLogs } from "@/lib/workouts";

type SearchParams = { exerciseId?: string };

export default async function ProfilePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const params = await searchParams;

  try {
    const [profile, workoutStats, nutritionStats, volumeData, calorieData, proteinData, muscleDistribution, workoutLogs] = await Promise.all([
      getUserProfile(user.id), getWorkoutStats(user.id), getNutritionStats(user.id), getWorkoutVolumeOverTime(user.id), getCaloriesOverTime(user.id), getProteinOverTime(user.id), getMuscleGroupDistribution(user.id), getUserWorkoutLogs(user.id),
    ]);
    if (!profile) return <ErrorState title="Profile unavailable" description="We could not find your profile record." />;

    const exerciseOptions = [...new Map(workoutLogs.map((log) => [log.exerciseId, { id: log.exerciseId, name: log.exercise.name }])).values()];
    const selectedExerciseId = exerciseOptions.some((exercise) => exercise.id === params.exerciseId) ? params.exerciseId : exerciseOptions[0]?.id;
    const strengthProgress = selectedExerciseId ? await getStrengthProgress(user.id, selectedExerciseId) : null;
    const selectedExercise = exerciseOptions.find((exercise) => exercise.id === selectedExerciseId);
    const insights = [
      strengthProgress?.entries ? `${selectedExercise?.name ?? "Selected exercise"} strength is ${strengthProgress.progressPercentage >= 0 ? "up" : "down"} ${Math.abs(strengthProgress.progressPercentage).toFixed(0)}% from your first logged weight.` : "Log an exercise twice to see strength improvement.",
      workoutStats.workoutStreak ? `You are on a ${workoutStats.workoutStreak}-day workout streak. Keep the momentum going.` : "Start a workout streak with one focused session today.",
      nutritionStats.averageProtein ? `Your average protein intake is ${Math.round(nutritionStats.averageProtein)}g per tracked day.` : "Log meals to measure your average protein intake.",
      workoutStats.mostTrainedMuscleGroup ? `${workoutStats.mostTrainedMuscleGroup} is your most trained muscle group.` : "Your most trained muscle group will appear after your first workout.",
    ];

    return <div className="space-y-8"><section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Profile & progress</p><h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Train with the full picture.</h1><p className="mt-2 text-zinc-400">Review the numbers behind your strength and nutrition habits.</p></div><Link href="/dashboard/settings" className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-bold text-zinc-300 transition hover:bg-white/8 hover:text-white"><Settings className="size-4" />Settings</Link></section><section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]"><ProfileCard profile={profile} /><InsightsCard insights={insights} /></section><section><div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Training</p><h2 className="mt-1 text-2xl font-black text-white">Workout stats</h2></div>{workoutStats.totalWorkouts ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><StatCard label="Total workout logs" value={workoutStats.totalWorkouts} icon={Dumbbell} /><StatCard label="Volume lifted" value={`${Math.round(workoutStats.totalVolumeLifted).toLocaleString()} kg`} icon={Weight} /><StatCard label="Total sets" value={workoutStats.totalSets} icon={Layers3} /><StatCard label="Total reps" value={workoutStats.totalReps} icon={Activity} /><StatCard label="Most trained" value={workoutStats.mostTrainedMuscleGroup ?? "—"} icon={Trophy} /><StatCard label="This week" value={workoutStats.weeklyWorkoutCount} icon={Dumbbell} /><StatCard label="This month" value={workoutStats.monthlyWorkoutCount} icon={Dumbbell} /><StatCard label="Current streak" value={`${workoutStats.workoutStreak} days`} icon={Trophy} /></div> : <EmptyState title="No workout stats yet" description="Log a workout to start measuring your training progress." />}</section><section><div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Nutrition</p><h2 className="mt-1 text-2xl font-black text-white">Average intake</h2></div>{nutritionStats.trackedDays ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><StatCard label="Daily calories" value={`${Math.round(nutritionStats.averageDailyCalories)} kcal`} icon={Utensils} /><StatCard label="Protein" value={`${Math.round(nutritionStats.averageProtein)} g`} icon={Utensils} /><StatCard label="Carbs" value={`${Math.round(nutritionStats.averageCarbs)} g`} icon={Utensils} /><StatCard label="Fats" value={`${Math.round(nutritionStats.averageFats)} g`} icon={Utensils} /></div> : <EmptyState title="No nutrition data yet" description="Log food to see your average daily nutrition." />}</section><section className="grid gap-4 xl:grid-cols-2"><ProgressChart title="Workout volume" description="Total volume lifted by day." data={volumeData} dataKey="volume" unit="kg" /><ProgressChart title="Calories over time" description="Daily calories from logged meals." data={calorieData} dataKey="value" unit="kcal" /><ProgressChart title="Protein over time" description="Daily protein from logged meals." data={proteinData} dataKey="value" unit="g" /><Card title="Exercise strength progress" description="Track load progression for a movement."><ExerciseProgressPicker exercises={exerciseOptions} selectedId={selectedExerciseId} />{strengthProgress?.entries ? <div className="mt-5"><ProgressChart title="" description="" data={strengthProgress.history} dataKey="weight" unit="kg" /></div> : <div className="flex h-56 items-center justify-center text-sm text-zinc-500">Select an exercise after logging a workout.</div>}</Card></section>{muscleDistribution.length ? <section><div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Training focus</p><h2 className="mt-1 text-2xl font-black text-white">Muscle group distribution</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{muscleDistribution.map((group) => <Card key={group.muscleGroup} className="p-4"><p className="font-bold text-white">{group.muscleGroup}</p><p className="mt-2 text-sm text-zinc-400">{group.workouts} logs · {Math.round(group.volume).toLocaleString()} kg volume</p></Card>)}</div></section> : null}</div>;
  } catch {
    return <ErrorState title="Unable to load progress" description="Check your database connection and try again." />;
  }
}
