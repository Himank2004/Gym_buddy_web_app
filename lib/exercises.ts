import { type Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export interface ExerciseFilters {
  search?: string;
  muscleGroup?: string;
  equipment?: string;
  difficulty?: string;
}

export async function getExercises(filters: ExerciseFilters = {}) {
  const where: Prisma.ExerciseWhereInput = {};
  const search = filters.search?.trim();

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { category: { contains: search, mode: "insensitive" } },
      { muscleGroup: { contains: search, mode: "insensitive" } },
    ];
  }

  if (filters.muscleGroup) where.muscleGroup = { equals: filters.muscleGroup, mode: "insensitive" };
  if (filters.equipment) where.equipment = { equals: filters.equipment, mode: "insensitive" };
  if (filters.difficulty) where.difficulty = { equals: filters.difficulty, mode: "insensitive" };

  return prisma.exercise.findMany({ where, orderBy: { name: "asc" } });
}

export function getExerciseById(id: string) {
  return prisma.exercise.findUnique({ where: { id } });
}

export function getExerciseBySlug(slug: string) {
  return prisma.exercise.findUnique({ where: { slug } });
}
