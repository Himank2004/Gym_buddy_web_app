"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { type WorkoutLogInput, workoutLogSchema } from "@/lib/validations/workout";

type WorkoutResponse = { error?: string; fields?: Partial<Record<keyof WorkoutLogInput, string[]>> };

const defaultDateTime = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
};

export function WorkoutLogForm({ exerciseId, exerciseName }: { exerciseId: string; exerciseName: string }) {
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const [isComplete, setIsComplete] = useState(false);
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<WorkoutLogInput>({
    resolver: zodResolver(workoutLogSchema),
    defaultValues: { exerciseId, sets: 3, reps: 10, weightKg: 0, performedAt: defaultDateTime() },
  });

  const onSubmit = async (data: WorkoutLogInput) => {
    setFormError(undefined);
    try {
      const response = await fetch("/api/workouts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const payload = await response.json().catch(() => ({})) as WorkoutResponse;

      if (!response.ok) {
        Object.entries(payload.fields ?? {}).forEach(([field, messages]) => {
          if (messages?.[0] && field in data) setError(field as keyof WorkoutLogInput, { message: messages[0] });
        });
        setFormError(payload.error ?? "Unable to save workout log.");
        return;
      }

      setIsComplete(true);
      window.setTimeout(() => router.replace(`/dashboard/exercises/${exerciseId}`), 800);
    } catch {
      setFormError("Unable to save your workout. Check your connection and try again.");
    }
  };

  return <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate><input type="hidden" {...register("exerciseId")} />{formError && <p className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200" role="alert">{formError}</p>}{isComplete && <p className="flex items-center gap-2 rounded-xl border border-lime-300/20 bg-lime-300/10 px-3 py-2 text-sm text-lime-100" role="status"><CheckCircle2 className="size-4" />Workout saved. Returning to {exerciseName}…</p>}<div className="grid gap-4 sm:grid-cols-3"><Input label="Sets" type="number" min="1" step="1" error={errors.sets?.message} {...register("sets", { valueAsNumber: true })} /><Input label="Reps" type="number" min="1" step="1" error={errors.reps?.message} {...register("reps", { valueAsNumber: true })} /><Input label="Weight (kg)" type="number" min="0" step="0.5" error={errors.weightKg?.message} {...register("weightKg", { valueAsNumber: true })} /></div><div className="grid gap-4 sm:grid-cols-2"><Input label="Duration (minutes)" type="number" min="0" step="1" error={errors.durationMinutes?.message} {...register("durationMinutes", { setValueAs: (value) => value === "" ? undefined : Number(value) })} /><Input label="Rest (seconds)" type="number" min="0" step="1" error={errors.restSeconds?.message} {...register("restSeconds", { setValueAs: (value) => value === "" ? undefined : Number(value) })} /></div><Input label="Date and time" type="datetime-local" error={errors.performedAt?.message} {...register("performedAt")} /><Textarea label="Notes" placeholder="How did this set feel?" helperText="Optional · up to 1,000 characters" error={errors.notes?.message} {...register("notes")} /><Button type="submit" className="w-full" disabled={isSubmitting || isComplete}>{isSubmitting ? "Saving workout…" : "Save workout"}</Button></form>;
}
