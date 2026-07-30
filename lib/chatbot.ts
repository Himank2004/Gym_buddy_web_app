import { calculateDailyCalories, calculateDailyCarbs, calculateDailyFats, calculateDailyProtein } from "@/lib/calculations";
import { getTodayFoodLogs } from "@/lib/nutrition";
import { prisma } from "@/lib/prisma";
import { getRecentWorkoutLogs } from "@/lib/workouts";

export type ChatRole = "user" | "assistant";

export interface DietBotContext {
  goal: string | null;
  calories: number;
  calorieGoal: number;
  protein: number;
  proteinGoal: number;
  carbs: number;
  carbsGoal: number;
  fats: number;
  fatsGoal: number;
  recentWorkouts: string[];
}

export function getChatHistory(userId: string) {
  return prisma.chatMessage.findMany({ where: { userId }, orderBy: { createdAt: "asc" }, take: 50 });
}

export function saveChatMessage(userId: string, role: ChatRole, content: string) {
  const message = content.trim();
  if (!message) throw new Error("Chat messages cannot be empty.");
  return prisma.chatMessage.create({ data: { userId, role, content: message } });
}

export async function getDietBotContext(userId: string): Promise<DietBotContext> {
  const [user, foodLogs, workouts] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        goal: true,
        dailyCalorieGoal: true,
        dailyProteinGoal: true,
        dailyCarbsGoal: true,
        dailyFatsGoal: true,
      },
    }),
    getTodayFoodLogs(userId),
    getRecentWorkoutLogs(userId, 3),
  ]);

  return {
    goal: user?.goal ?? null,
    calories: calculateDailyCalories(foodLogs),
    calorieGoal: user?.dailyCalorieGoal ?? 2200,
    protein: calculateDailyProtein(foodLogs),
    proteinGoal: user?.dailyProteinGoal ?? 130,
    carbs: calculateDailyCarbs(foodLogs),
    carbsGoal: user?.dailyCarbsGoal ?? 250,
    fats: calculateDailyFats(foodLogs),
    fatsGoal: user?.dailyFatsGoal ?? 70,
    recentWorkouts: workouts.map((workout) => workout.exercise.name),
  };
}

function fallbackDietBotResponse(message: string, context: DietBotContext) {
  const question = message.toLowerCase();
  const remainingCalories = Math.max(context.calorieGoal - context.calories, 0);
  const remainingProtein = Math.max(context.proteinGoal - context.protein, 0);

  if (question.includes("today") && question.includes("calor")) return `You have logged ${Math.round(context.calories)} of ${context.calorieGoal} kcal today, leaving about ${Math.round(remainingCalories)} kcal. Prioritize a balanced meal rather than trying to hit calories with one food.`;
  if (question.includes("protein")) return `You have ${Math.round(context.protein)}g of protein logged against a ${context.proteinGoal}g goal. ${remainingProtein > 0 ? `Aim for roughly ${Math.round(remainingProtein)}g more from foods like eggs, Greek yogurt, paneer, tofu, chicken, fish, dal, or whey.` : "You have reached your protein target—spread any additional protein across meals if it suits you."}`;
  if (question.includes("deficit") || question.includes("fat loss")) return "For fat loss, use a modest, sustainable calorie deficit while keeping protein high and continuing strength training. Avoid extreme cuts; consistency, filling whole foods, and sleep matter more than perfect daily numbers.";
  if (question.includes("surplus") || question.includes("muscle gain") || question.includes("bulk")) return "For muscle gain, use a small calorie surplus, train with progressive overload, and keep protein consistent. Add calories gradually—mostly from nutrient-dense carbs and fats—then monitor strength and body-weight trends for a few weeks.";
  if (question.includes("post-workout") || question.includes("after workout")) return "After training, choose a meal with protein and carbohydrates: for example, chicken or tofu with rice, Greek yogurt with fruit and oats, or a whey shake with a banana. Hydrate too—timing matters less than meeting your full-day intake.";
  if (question.includes("macro") || question.includes("carb") || question.includes("fat")) return `Today you are at ${Math.round(context.protein)}g protein, ${Math.round(context.carbs)}g carbs, and ${Math.round(context.fats)}g fats. Compare that with your goals of ${context.proteinGoal}g, ${context.carbsGoal}g, and ${context.fatsGoal}g, then use your next meal to fill the largest gap.`;

  return `I can help you plan meals around your ${context.goal ?? "fitness"} goal. Today you have logged ${Math.round(context.calories)} kcal and ${Math.round(context.protein)}g protein. Ask me about protein, calorie balance, muscle gain, fat loss, or a post-workout meal.`;
}

export async function generateDietBotResponse(message: string, context: DietBotContext) {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) return fallbackDietBotResponse(message, context);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are FitForge Diet Bot, a supportive fitness nutrition assistant. Give concise, practical, non-medical advice. Do not diagnose conditions or prescribe treatment." },
          { role: "system", content: `User context: ${JSON.stringify(context)}` },
          { role: "user", content: message },
        ],
        temperature: 0.5,
        max_tokens: 300,
      }),
    });
    const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content?.trim();
    return content || fallbackDietBotResponse(message, context);
  } catch {
    return fallbackDietBotResponse(message, context);
  }
}
