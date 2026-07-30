"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/Select";

interface ExerciseOption { id: string; name: string; }

export function ExerciseProgressPicker({ exercises, selectedId }: { exercises: ExerciseOption[]; selectedId?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  if (!exercises.length) return <p className="text-sm text-zinc-500">Log an exercise to view strength progress.</p>;
  return <Select label="Exercise" value={selectedId ?? exercises[0].id} onChange={(event) => { const params = new URLSearchParams(searchParams.toString()); params.set("exerciseId", event.target.value); router.push(`/dashboard/profile?${params.toString()}`); }}><>{exercises.map((exercise) => <option key={exercise.id} value={exercise.id}>{exercise.name}</option>)}</></Select>;
}
