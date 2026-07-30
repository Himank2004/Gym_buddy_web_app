import { prisma } from "@/lib/prisma";
import { type FoodLogInput, foodLogSchema } from "@/lib/validations/nutrition";

function getDayRange(date: Date | string) {
  const selectedDate = new Date(date);
  if (Number.isNaN(selectedDate.getTime())) throw new Error("Invalid date.");

  const start = new Date(selectedDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

export function getCommonFoodItems() {
  return prisma.foodItem.findMany({ orderBy: { name: "asc" }, take: 100 });
}

export function getUserNutritionGoals(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      dailyCalorieGoal: true,
      dailyProteinGoal: true,
      dailyCarbsGoal: true,
      dailyFatsGoal: true,
    },
  });
}

export function searchFoodItems(query: string) {
  const search = query.trim();
  if (!search) return getCommonFoodItems();

  return prisma.foodItem.findMany({
    where: { name: { contains: search, mode: "insensitive" } },
    orderBy: { name: "asc" },
    take: 50,
  });
}

export async function createFoodLog(userId: string, input: FoodLogInput) {
  const data = foodLogSchema.parse(input);
  return prisma.foodLog.create({ data: { ...data, userId, consumedAt: new Date(data.consumedAt) } });
}

/** Updates only a food log owned by the supplied user. */
export async function updateFoodLog(userId: string, id: string, input: FoodLogInput) {
  const data = foodLogSchema.parse(input);
  return prisma.foodLog.updateMany({
    where: { id, userId },
    data: { ...data, consumedAt: new Date(data.consumedAt) },
  });
}

/** Deletes only a food log owned by the supplied user. */
export function deleteFoodLog(userId: string, id: string) {
  return prisma.foodLog.deleteMany({ where: { id, userId } });
}

export function getTodayFoodLogs(userId: string) {
  return getFoodLogsByDate(userId, new Date());
}

export function getFoodLogsByDate(userId: string, date: Date | string) {
  const { start, end } = getDayRange(date);
  return prisma.foodLog.findMany({
    where: { userId, consumedAt: { gte: start, lt: end } },
    orderBy: { consumedAt: "asc" },
  });
}

export function getFoodLogById(userId: string, id: string) {
  return prisma.foodLog.findFirst({ where: { id, userId } });
}
