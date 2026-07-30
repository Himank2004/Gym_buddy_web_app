import type { FoodLog } from "@prisma/client";

type NutritionFields = Pick<FoodLog, "calories" | "proteinG" | "carbsG" | "fatsG" | "mealType">;

function sum(logs: NutritionFields[], field: "calories" | "proteinG" | "carbsG" | "fatsG") {
  return logs.reduce((total, log) => total + log[field], 0);
}

export function calculateDailyCalories(foodLogs: NutritionFields[]) {
  return sum(foodLogs, "calories");
}

export function calculateDailyProtein(foodLogs: NutritionFields[]) {
  return sum(foodLogs, "proteinG");
}

export function calculateDailyCarbs(foodLogs: NutritionFields[]) {
  return sum(foodLogs, "carbsG");
}

export function calculateDailyFats(foodLogs: NutritionFields[]) {
  return sum(foodLogs, "fatsG");
}

export function calculateMacroGoalPercentage(current: number, goal: number) {
  if (goal <= 0) return 0;
  return Math.round((current / goal) * 100);
}

export function groupFoodLogsByMeal<T extends Pick<FoodLog, "mealType">>(foodLogs: T[]) {
  return foodLogs.reduce<Record<string, T[]>>((groups, log) => {
    groups[log.mealType] ??= [];
    groups[log.mealType].push(log);
    return groups;
  }, {});
}
