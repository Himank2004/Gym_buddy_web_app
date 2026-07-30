import { CalendarDays, Dumbbell, Lightbulb, Timer } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ExerciseDetailImage } from "@/components/exercises/ExerciseDetailImage";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { getCurrentUser } from "@/lib/auth";
import { getExerciseById } from "@/lib/exercises";
import { getWorkoutLogsByExercise } from "@/lib/workouts";

export default async function ExerciseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [exercise, user] = await Promise.all([getExerciseById(id), getCurrentUser()]);
  if (!exercise) notFound();
  if (!user) redirect("/login");

  const logs = await getWorkoutLogsByExercise(user.id, exercise.id);
  const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-8"><section className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center"><ExerciseDetailImage src={exercise.imageUrl} alt={exercise.name} /><div><Link href="/dashboard/exercises" className="text-sm font-bold text-lime-300 transition hover:text-lime-200">← Exercise library</Link><p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-lime-300">{exercise.category}</p><h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">{exercise.name}</h1><p className="mt-4 text-lg leading-8 text-zinc-400">Build confident form and focused strength with this {exercise.difficulty.toLowerCase()} movement.</p><div className="mt-6 flex flex-wrap gap-2"><Badge variant="muscle">{exercise.muscleGroup}</Badge><Badge variant="equipment">{exercise.equipment}</Badge><Badge variant="difficulty">{exercise.difficulty}</Badge></div><Link href={`/dashboard/exercises/${exercise.id}/log`} className="mt-8 inline-flex h-11 items-center rounded-xl bg-lime-300 px-5 text-sm font-bold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-lime-200">Log Workout <Dumbbell className="ml-2 size-4" /></Link></div></section>
      <section className="grid gap-4 lg:grid-cols-2"><Card title="Instructions" description="Move with control and intent."><ol className="space-y-3"><li className="flex gap-3"><span className="mt-0.5 text-lime-300">01</span><p className="text-sm leading-6 text-zinc-300">{exercise.instructions}</p></li><li className="flex gap-3"><span className="mt-0.5 text-lime-300">02</span><p className="text-sm leading-6 text-zinc-400">Maintain a stable position and breathe consistently through each repetition.</p></li></ol></Card><Card title="Tips" description="Small adjustments make every rep count."><div className="flex gap-3"><Lightbulb className="size-5 shrink-0 text-amber-200" /><p className="text-sm leading-6 text-zinc-300">{exercise.tips}</p></div><div className="mt-5 border-t border-white/8 pt-5"><p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Secondary muscles</p><div className="mt-3 flex flex-wrap gap-2">{exercise.secondaryMuscles.map((muscle) => <Badge key={muscle} variant="muscle">{muscle}</Badge>)}</div></div></Card></section>
      <section><div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Your history</p><h2 className="mt-1 text-2xl font-black text-white">Recent logs</h2></div>{logs.length ? <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{logs.slice(0, 6).map((log) => <Card key={log.id} className="p-4"><div className="flex items-center justify-between"><span className="rounded-lg bg-lime-300/10 p-2 text-lime-300"><CalendarDays className="size-4" /></span><time className="text-xs text-zinc-500">{dateFormatter.format(log.performedAt)}</time></div><p className="mt-5 text-xl font-black text-white">{log.sets} <span className="text-sm font-medium text-zinc-500">sets</span> · {log.reps} <span className="text-sm font-medium text-zinc-500">reps</span></p><div className="mt-4 flex gap-4 text-xs text-zinc-400"><span className="inline-flex items-center gap-1"><Dumbbell className="size-3.5" />{log.weightKg} kg</span>{log.durationMinutes && <span className="inline-flex items-center gap-1"><Timer className="size-3.5" />{log.durationMinutes} min</span>}</div>{log.notes && <p className="mt-4 border-t border-white/8 pt-3 text-sm text-zinc-500">{log.notes}</p>}</Card>)}</div> : <EmptyState title="No workout logs yet" description="Your completed sets and reps for this exercise will appear here." action={<Link href={`/dashboard/exercises/${exercise.id}/log`} className="text-sm font-bold text-lime-300 hover:text-lime-200">Log your first workout</Link>} />}</section></div>
  );
}
