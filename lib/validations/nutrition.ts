import { z } from "zod";

const nonNegativeNumber = z.number().min(0, "Value cannot be negative.");

export const foodLogSchema = z.object({
  foodName: z.string().trim().min(1, "Food name is required.").max(120),
  quantity: z.number().positive("Quantity must be greater than 0."),
  servingUnit: z.string().trim().min(1, "Serving unit is required.").max(50),
  calories: nonNegativeNumber,
  proteinG: nonNegativeNumber,
  carbsG: nonNegativeNumber,
  fatsG: nonNegativeNumber,
  mealType: z.string().trim().min(1, "Meal type is required.").max(40),
  consumedAt: z.string().min(1, "Date and time are required.").refine((value) => !Number.isNaN(Date.parse(value)), "Enter a valid date and time."),
});

export type FoodLogInput = z.infer<typeof foodLogSchema>;
