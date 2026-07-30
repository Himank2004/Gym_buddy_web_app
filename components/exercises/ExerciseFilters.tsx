import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { ExerciseSearch } from "@/components/exercises/ExerciseSearch";

const muscleGroups = ["Chest", "Back", "Shoulders", "Biceps", "Triceps", "Legs", "Glutes", "Core", "Cardio", "Full Body"];
const equipment = ["Barbell", "Dumbbell", "Dumbbells", "Bodyweight", "Cable Machine", "Machine", "Kettlebell"];
const difficulties = ["Beginner", "Intermediate", "Advanced"];

interface ExerciseFiltersProps { search?: string; muscleGroup?: string; equipment?: string; difficulty?: string; }

export function ExerciseFilters({ search, muscleGroup, equipment: selectedEquipment, difficulty }: ExerciseFiltersProps) {
  return (
    <form action="/dashboard/exercises" className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))_auto] lg:items-end"><ExerciseSearch defaultValue={search} /><Select name="muscleGroup" aria-label="Filter by muscle group" defaultValue={muscleGroup}><option value="">All muscle groups</option>{muscleGroups.map((group) => <option key={group} value={group}>{group}</option>)}</Select><Select name="equipment" aria-label="Filter by equipment" defaultValue={selectedEquipment}><option value="">All equipment</option>{equipment.map((item) => <option key={item} value={item}>{item}</option>)}</Select><Select name="difficulty" aria-label="Filter by difficulty" defaultValue={difficulty}><option value="">All difficulties</option>{difficulties.map((item) => <option key={item} value={item}>{item}</option>)}</Select><div className="flex gap-2"><Button type="submit" className="flex-1">Apply</Button><Link href="/dashboard/exercises" className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 px-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/8 hover:text-white">Clear</Link></div></div></form>
  );
}
