import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { ExerciseFilters } from "@/components/exercises/ExerciseFilters";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { getExercises } from "@/lib/exercises";

type SearchParams = { search?: string; muscleGroup?: string; equipment?: string; difficulty?: string; };

export default async function ExercisesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const filters = { search: params.search?.trim() || undefined, muscleGroup: params.muscleGroup || undefined, equipment: params.equipment || undefined, difficulty: params.difficulty || undefined };

  try {
    const exercises = await getExercises(filters);

    return <div className="space-y-7"><section><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Train with intent</p><h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Exercise library</h1><p className="mt-2 text-zinc-400">Find the movement that fits your next session.</p></section><ExerciseFilters {...filters} />{exercises.length ? <><p className="text-sm text-zinc-500">{exercises.length} exercise{exercises.length === 1 ? "" : "s"} found</p><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{exercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} />)}</section></> : <EmptyState title="No exercises found" description="Try changing your search or clearing one of the filters." />}</div>;
  } catch {
    return <ErrorState title="Unable to load exercises" description="Check that your database is connected and the exercise seed has been run." />;
  }
}
