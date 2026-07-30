import { ArrowLeft, Dumbbell } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkoutLogForm } from "@/components/exercises/WorkoutLogForm";
import { Card } from "@/components/ui/Card";
import { getExerciseById } from "@/lib/exercises";

export default async function ExerciseLogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exercise = await getExerciseById(id);
  if (!exercise) notFound();

  return <div className="mx-auto max-w-3xl"><Link href={`/dashboard/exercises/${exercise.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-lime-300 transition hover:text-lime-200"><ArrowLeft className="size-4" />Back to {exercise.name}</Link><section className="mt-7"><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Workout log</p><h1 className="mt-2 flex items-center gap-3 text-3xl font-black tracking-tight text-white sm:text-4xl"><span className="rounded-xl bg-lime-300/10 p-2 text-lime-300"><Dumbbell className="size-6" /></span>{exercise.name}</h1><p className="mt-3 text-zinc-400">Capture the details while your workout is fresh.</p></section><Card className="mt-8 p-5 sm:p-7"><WorkoutLogForm exerciseId={exercise.id} exerciseName={exercise.name} /></Card></div>;
}
