import { z } from "zod";

export const workoutLogSchema = z.object({
  exerciseId: z.string().cuid("Select a valid exercise."),
  sets: z.number().int().positive("Sets must be greater than 0."),
  reps: z.number().int().positive("Reps must be greater than 0."),
  weightKg: z.number().min(0, "Weight cannot be negative."),
  durationMinutes: z.number().min(0, "Duration cannot be negative.").optional(),
  restSeconds: z.number().int().min(0).optional(),
  notes: z.string().trim().max(1000).optional(),
  performedAt: z.string().min(1, "Date and time are required.").refine((value) => !Number.isNaN(Date.parse(value)), "Enter a valid date and time."),
});

export type WorkoutLogInput = z.infer<typeof workoutLogSchema>;
