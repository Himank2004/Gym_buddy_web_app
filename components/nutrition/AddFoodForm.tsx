"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FoodSearchPicker, type FoodOption } from "@/components/nutrition/FoodSearchPicker";
import { type FoodLogInput, foodLogSchema } from "@/lib/validations/nutrition";

type FoodResponse = { error?: string; fields?: Partial<Record<keyof FoodLogInput, string[]>> };
const initialValues = (): FoodLogInput => ({ foodName: "", quantity: 1, servingUnit: "serving", calories: 0, proteinG: 0, carbsG: 0, fatsG: 0, mealType: "Breakfast", consumedAt: new Date().toISOString() });

export function AddFoodForm({ foods }: { foods: FoodOption[] }) {
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const [isComplete, setIsComplete] = useState(false);
  const { register, handleSubmit, reset, setError, setValue, formState: { errors, isSubmitting } } = useForm<FoodLogInput>({ resolver: zodResolver(foodLogSchema), defaultValues: initialValues() });
  const onFoodSelect = (food: FoodOption) => { setValue("foodName", food.name); setValue("servingUnit", food.servingSize); setValue("calories", food.calories); setValue("proteinG", food.proteinG); setValue("carbsG", food.carbsG); setValue("fatsG", food.fatsG); };

  const onSubmit = async (data: FoodLogInput) => {
    setFormError(undefined); setIsComplete(false);
    try {
      const response = await fetch("/api/nutrition", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const payload = await response.json().catch(() => ({})) as FoodResponse;
      if (!response.ok) { Object.entries(payload.fields ?? {}).forEach(([field, messages]) => { if (messages?.[0] && field in data) setError(field as keyof FoodLogInput, { message: messages[0] }); }); setFormError(payload.error ?? "Unable to save food log."); return; }
      reset(initialValues()); setIsComplete(true); router.refresh();
    } catch {
      setFormError("Unable to save your food log. Check your connection and try again.");
    }
  };

  return <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>{formError && <p className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200" role="alert">{formError}</p>}{isComplete && <p className="flex items-center gap-2 rounded-xl border border-lime-300/20 bg-lime-300/10 px-3 py-2 text-sm text-lime-100" role="status"><CheckCircle2 className="size-4" />Food added to today’s log.</p>}<FoodSearchPicker foods={foods} onSelect={onFoodSelect} /><div className="grid gap-4 sm:grid-cols-2"><Input label="Food name" error={errors.foodName?.message} {...register("foodName")} /><Input label="Quantity" type="number" min="0.1" step="0.1" error={errors.quantity?.message} {...register("quantity", { valueAsNumber: true })} /></div><div className="grid gap-4 sm:grid-cols-2"><Input label="Serving unit" placeholder="e.g. 1 cup" error={errors.servingUnit?.message} {...register("servingUnit")} /><Select label="Meal type" error={errors.mealType?.message} {...register("mealType")}><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option></Select></div><div className="grid grid-cols-2 gap-4 sm:grid-cols-4"><Input label="Calories" type="number" min="0" error={errors.calories?.message} {...register("calories", { valueAsNumber: true })} /><Input label="Protein (g)" type="number" min="0" step="0.1" error={errors.proteinG?.message} {...register("proteinG", { valueAsNumber: true })} /><Input label="Carbs (g)" type="number" min="0" step="0.1" error={errors.carbsG?.message} {...register("carbsG", { valueAsNumber: true })} /><Input label="Fats (g)" type="number" min="0" step="0.1" error={errors.fatsG?.message} {...register("fatsG", { valueAsNumber: true })} /></div><Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Adding food…" : "Add food to today"}</Button></form>;
}
