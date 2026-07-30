import { prisma } from "@/lib/prisma";
import { type WorkoutLogInput, workoutLogSchema } from "@/lib/validations/workout";

const workoutLogInclude = { exercise: true };

export async function createWorkoutLog(userId: string, input: WorkoutLogInput) {
  const data = workoutLogSchema.parse(input);

  return prisma.workoutLog.create({
    data: { ...data, userId, performedAt: new Date(data.performedAt) },
    include: workoutLogInclude,
  });
}

export function getUserWorkoutLogs(userId: string) {
  return prisma.workoutLog.findMany({
    where: { userId },
    include: workoutLogInclude,
    orderBy: { performedAt: "desc" },
  });
}

export function getRecentWorkoutLogs(userId: string, limit = 5) {
  return prisma.workoutLog.findMany({
    where: { userId },
    include: workoutLogInclude,
    orderBy: { performedAt: "desc" },
    take: Math.min(Math.max(Math.floor(limit), 1), 20),
  });
}

export function getWorkoutLogsByExercise(userId: string, exerciseId: string) {
  return prisma.workoutLog.findMany({
    where: { userId, exerciseId },
    include: workoutLogInclude,
    orderBy: { performedAt: "desc" },
  });
}

/** Deletes only a log owned by the supplied user. */
export function deleteWorkoutLog(userId: string, logId: string) {
  return prisma.workoutLog.deleteMany({ where: { id: logId, userId } });
}
