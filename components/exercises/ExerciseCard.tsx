"use client";

import type { Exercise } from "@prisma/client";
import { Dumbbell, ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <Link href={`/dashboard/exercises/${exercise.id}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/65 transition hover:-translate-y-1 hover:border-lime-300/30 hover:shadow-xl hover:shadow-lime-950/20">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
        {hasImageError ? <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-zinc-500"><ImageOff className="size-8" aria-label="Exercise image unavailable" /></div> : <Image src={exercise.imageUrl} alt={exercise.name} fill sizes="(min-width: 1280px) 20vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" onError={() => setHasImageError(true)} />}
        <span className="absolute left-3 top-3 rounded-lg bg-zinc-950/75 p-2 text-lime-300 backdrop-blur"><Dumbbell className="size-4" /></span>
      </div>
      <div className="min-w-0 p-4"><h2 className="truncate text-base font-bold text-white">{exercise.name}</h2><p className="mt-1 truncate text-sm text-zinc-400">{exercise.muscleGroup} · {exercise.equipment}</p><div className="mt-4"><Badge variant="difficulty">{exercise.difficulty}</Badge></div></div>
    </Link>
  );
}
