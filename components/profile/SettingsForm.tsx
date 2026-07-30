"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { type UserProfileInput, userProfileSchema } from "@/lib/profile";

type ProfileResponse = { error?: string; fields?: Partial<Record<keyof UserProfileInput, string[]>> };

export function SettingsForm({ initialValues }: { initialValues: UserProfileInput }) {
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const [isComplete, setIsComplete] = useState(false);
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<UserProfileInput>({ resolver: zodResolver(userProfileSchema), defaultValues: initialValues });
  const numberValue = (value: string) => value === "" ? undefined : Number(value);

  const onSubmit = async (data: UserProfileInput) => {
    setFormError(undefined); setIsComplete(false);
    try {
      const response = await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const payload = await response.json().catch(() => ({})) as ProfileResponse;
      if (!response.ok) { Object.entries(payload.fields ?? {}).forEach(([field, messages]) => { if (messages?.[0]) setError(field as keyof UserProfileInput, { message: messages[0] }); }); setFormError(payload.error ?? "Unable to update settings."); return; }
      setIsComplete(true); router.refresh();
    } catch {
      setFormError("Unable to update settings. Check your connection and try again.");
    }
  };

  return <form className="space-y-7" onSubmit={handleSubmit(onSubmit)} noValidate>{formError && <p className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200" role="alert">{formError}</p>}{isComplete && <p className="flex items-center gap-2 rounded-xl border border-lime-300/20 bg-lime-300/10 px-3 py-2 text-sm text-lime-100" role="status"><CheckCircle2 className="size-4" />Settings updated.</p>}<section><h2 className="text-lg font-black text-white">Profile</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><Input label="Full name" error={errors.name?.message} {...register("name")} /><Input label="Goal" placeholder="e.g. Build muscle" error={errors.goal?.message} {...register("goal")} /><Input label="Age" type="number" min="13" error={errors.age?.message} {...register("age", { setValueAs: numberValue })} /><Input label="Height (cm)" type="number" min="1" step="0.1" error={errors.heightCm?.message} {...register("heightCm", { setValueAs: numberValue })} /><Input label="Weight (kg)" type="number" min="1" step="0.1" error={errors.weightKg?.message} {...register("weightKg", { setValueAs: numberValue })} /><Select label="Activity level" error={errors.activityLevel?.message} {...register("activityLevel")}><option value="">Select activity level</option><option value="Sedentary">Sedentary</option><option value="Lightly active">Lightly active</option><option value="Moderately active">Moderately active</option><option value="Very active">Very active</option></Select></div></section><section className="border-t border-white/8 pt-7"><h2 className="text-lg font-black text-white">Daily macro goals</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><Input label="Daily calories" type="number" min="0" error={errors.dailyCalorieGoal?.message} {...register("dailyCalorieGoal", { setValueAs: numberValue })} /><Input label="Daily protein (g)" type="number" min="0" error={errors.dailyProteinGoal?.message} {...register("dailyProteinGoal", { setValueAs: numberValue })} /><Input label="Daily carbs (g)" type="number" min="0" error={errors.dailyCarbsGoal?.message} {...register("dailyCarbsGoal", { setValueAs: numberValue })} /><Input label="Daily fats (g)" type="number" min="0" error={errors.dailyFatsGoal?.message} {...register("dailyFatsGoal", { setValueAs: numberValue })} /></div></section><Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Saving settings…" : "Save settings"}</Button></form>;
}
