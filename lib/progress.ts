import type { FoodLog, WorkoutLog } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type WorkoutFields = Pick<WorkoutLog, "sets" | "reps" | "weightKg">;
type FoodFields = Pick<FoodLog, "calories" | "proteinG" | "consumedAt">;

export function calculateWorkoutVolume(log: WorkoutFields) {
  return log.sets * log.reps * log.weightKg;
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function startOfWeek(date: Date) {
  const start = new Date(date);
  const offset = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - offset);
  start.setHours(0, 0, 0, 0);
  return start;
}

function calculateWorkoutStreak(dates: Date[]) {
  const loggedDays = new Set(dates.map(dateKey));
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  if (!loggedDays.has(dateKey(cursor))) cursor.setDate(cursor.getDate() - 1);

  let streak = 0;
  while (loggedDays.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export async function getWorkoutStats(userId: string) {
  const logs = await prisma.workoutLog.findMany({
    where: { userId },
    select: { sets: true, reps: true, weightKg: true, performedAt: true, exercise: { select: { muscleGroup: true } } },
  });
  const now = new Date();
  const weekStart = startOfWeek(now);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const muscleCounts = new Map<string, number>();

  for (const log of logs) muscleCounts.set(log.exercise.muscleGroup, (muscleCounts.get(log.exercise.muscleGroup) ?? 0) + 1);
  const mostTrainedMuscleGroup = [...muscleCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  return {
    totalWorkouts: logs.length,
    totalSets: logs.reduce((total, log) => total + log.sets, 0),
    totalReps: logs.reduce((total, log) => total + log.reps, 0),
    totalVolumeLifted: logs.reduce((total, log) => total + calculateWorkoutVolume(log), 0),
    mostTrainedMuscleGroup,
    weeklyWorkoutCount: logs.filter((log) => log.performedAt >= weekStart).length,
    monthlyWorkoutCount: logs.filter((log) => log.performedAt >= monthStart).length,
    workoutStreak: calculateWorkoutStreak(logs.map((log) => log.performedAt)),
  };
}

export async function getNutritionStats(userId: string) {
  const logs = await prisma.foodLog.findMany({ where: { userId }, select: { calories: true, proteinG: true, carbsG: true, fatsG: true, consumedAt: true } });
  const dailyTotals = new Map<string, { calories: number; protein: number; carbs: number; fats: number }>();
  for (const log of logs) {
    const key = dateKey(log.consumedAt);
    const total = dailyTotals.get(key) ?? { calories: 0, protein: 0, carbs: 0, fats: 0 };
    total.calories += log.calories;
    total.protein += log.proteinG;
    total.carbs += log.carbsG;
    total.fats += log.fatsG;
    dailyTotals.set(key, total);
  }
  const days = [...dailyTotals.values()];
  return {
    averageDailyCalories: days.length ? days.reduce((total, day) => total + day.calories, 0) / days.length : 0,
    averageProtein: days.length ? days.reduce((total, day) => total + day.protein, 0) / days.length : 0,
    averageCarbs: days.length ? days.reduce((total, day) => total + day.carbs, 0) / days.length : 0,
    averageFats: days.length ? days.reduce((total, day) => total + day.fats, 0) / days.length : 0,
    trackedDays: days.length,
  };
}

export async function getStrengthProgress(userId: string, exerciseId: string) {
  const logs = await prisma.workoutLog.findMany({
    where: { userId, exerciseId },
    select: { weightKg: true, performedAt: true },
    orderBy: { performedAt: "asc" },
  });
  const startingWeight = logs[0]?.weightKg ?? 0;
  const currentWeight = logs.at(-1)?.weightKg ?? 0;
  const progressPercentage = startingWeight > 0 ? ((currentWeight - startingWeight) / startingWeight) * 100 : 0;
  return { startingWeight, currentWeight, progressPercentage, entries: logs.length, history: logs.map((log) => ({ date: dateKey(log.performedAt), weight: log.weightKg })) };
}

export async function getWorkoutVolumeOverTime(userId: string) {
  const logs = await prisma.workoutLog.findMany({ where: { userId }, select: { sets: true, reps: true, weightKg: true, performedAt: true }, orderBy: { performedAt: "asc" } });
  const points = new Map<string, number>();
  for (const log of logs) points.set(dateKey(log.performedAt), (points.get(dateKey(log.performedAt)) ?? 0) + calculateWorkoutVolume(log));
  return [...points].map(([date, volume]) => ({ date, volume }));
}

function groupFoodMetric(logs: FoodFields[], metric: "calories" | "proteinG") {
  const points = new Map<string, number>();
  for (const log of logs) points.set(dateKey(log.consumedAt), (points.get(dateKey(log.consumedAt)) ?? 0) + log[metric]);
  return [...points].map(([date, value]) => ({ date, value }));
}

export async function getCaloriesOverTime(userId: string) {
  const logs = await prisma.foodLog.findMany({ where: { userId }, select: { calories: true, proteinG: true, consumedAt: true }, orderBy: { consumedAt: "asc" } });
  return groupFoodMetric(logs, "calories");
}

export async function getProteinOverTime(userId: string) {
  const logs = await prisma.foodLog.findMany({ where: { userId }, select: { calories: true, proteinG: true, consumedAt: true }, orderBy: { consumedAt: "asc" } });
  return groupFoodMetric(logs, "proteinG");
}

export async function getMuscleGroupDistribution(userId: string) {
  const logs = await prisma.workoutLog.findMany({ where: { userId }, select: { sets: true, reps: true, weightKg: true, exercise: { select: { muscleGroup: true } } } });
  const distribution = new Map<string, { workouts: number; volume: number }>();
  for (const log of logs) {
    const current = distribution.get(log.exercise.muscleGroup) ?? { workouts: 0, volume: 0 };
    current.workouts += 1;
    current.volume += calculateWorkoutVolume(log);
    distribution.set(log.exercise.muscleGroup, current);
  }
  return [...distribution].map(([muscleGroup, values]) => ({ muscleGroup, ...values })).sort((a, b) => b.workouts - a.workouts);
}
