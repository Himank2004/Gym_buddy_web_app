import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const userProfileSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  image: z.string().url().nullable().optional(),
  gender: z.string().trim().max(40).nullable().optional(),
  age: z.number().int().min(13).max(120).nullable().optional(),
  heightCm: z.number().positive().max(300).nullable().optional(),
  weightKg: z.number().positive().max(500).nullable().optional(),
  goal: z.string().trim().max(100).nullable().optional(),
  activityLevel: z.string().trim().max(50).nullable().optional(),
  dailyCalorieGoal: z.number().int().min(0).max(10000).optional(),
  dailyProteinGoal: z.number().int().min(0).max(1000).optional(),
  dailyCarbsGoal: z.number().int().min(0).max(2000).optional(),
  dailyFatsGoal: z.number().int().min(0).max(1000).optional(),
}).refine((input) => Object.keys(input).length > 0, "Provide at least one profile field.");

export type UserProfileInput = z.infer<typeof userProfileSchema>;

const profileSelect = {
  id: true,
  name: true,
  email: true,
  image: true,
  gender: true,
  age: true,
  heightCm: true,
  weightKg: true,
  goal: true,
  activityLevel: true,
  dailyCalorieGoal: true,
  dailyProteinGoal: true,
  dailyCarbsGoal: true,
  dailyFatsGoal: true,
  createdAt: true,
  updatedAt: true,
} as const;

export function getUserProfile(userId: string) {
  return prisma.user.findUnique({ where: { id: userId }, select: profileSelect });
}

/** Updates only the profile record identified by the supplied user ID. */
export async function updateUserProfile(userId: string, input: UserProfileInput) {
  const data = userProfileSchema.parse(input);
  return prisma.user.updateMany({ where: { id: userId }, data });
}
