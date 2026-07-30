"use client";

import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ExerciseDetailImageProps { src: string; alt: string; }

export function ExerciseDetailImage({ src, alt }: ExerciseDetailImageProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/25">{hasImageError ? <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-zinc-500"><div className="text-center"><ImageOff className="mx-auto size-9" aria-hidden="true" /><p className="mt-3 text-sm">Exercise image unavailable</p></div></div> : <Image src={src} alt={alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" onError={() => setHasImageError(true)} />}</div>;
}
