"use client";

import { Pencil, Trash2, Utensils } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface FoodLogCardProps { id: string; foodName: string; mealType: string; quantity: number; servingUnit: string; calories: number; proteinG: number; carbsG: number; fatsG: number; }

export function FoodLogCard({ id, foodName, mealType, quantity, servingUnit, calories, proteinG, carbsG, fatsG }: FoodLogCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string>();
  const removeLog = async () => {
    if (!window.confirm(`Delete ${foodName}?`)) return;
    setIsDeleting(true); setError(undefined);
    try {
      const response = await fetch(`/api/nutrition/${id}`, { method: "DELETE" });
      if (!response.ok) { setError("Unable to delete food log."); setIsDeleting(false); return; }
      router.refresh();
    } catch {
      setError("Unable to delete food log. Check your connection and try again.");
      setIsDeleting(false);
    }
  };

  return <Card className="p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-3"><span className="rounded-xl bg-sky-300/10 p-2 text-sky-200"><Utensils className="size-4" /></span><div className="min-w-0"><p className="truncate font-bold text-white">{foodName}</p><p className="mt-0.5 text-xs text-zinc-500">{mealType} · {quantity} {servingUnit}</p></div></div><span className="text-sm font-black text-white">{Math.round(calories)} kcal</span></div><div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/8 pt-3 text-center text-xs"><span><b className="block text-sky-200">{Math.round(proteinG)}g</b><span className="text-zinc-500">Protein</span></span><span><b className="block text-amber-200">{Math.round(carbsG)}g</b><span className="text-zinc-500">Carbs</span></span><span><b className="block text-violet-200">{Math.round(fatsG)}g</b><span className="text-zinc-500">Fats</span></span></div>{error && <p className="mt-3 text-xs text-rose-300" role="alert">{error}</p>}<div className="mt-4 flex gap-2"><Link href={`/dashboard/nutrition/${id}/edit`} className="inline-flex h-9 flex-1 items-center justify-center gap-1 rounded-lg border border-white/10 text-xs font-bold text-zinc-300 transition hover:bg-white/8 hover:text-white"><Pencil className="size-3.5" />Edit</Link><Button variant="ghost" className="h-9 gap-1 px-3 text-xs text-rose-300 hover:bg-rose-400/10 hover:text-rose-200" disabled={isDeleting} onClick={removeLog}><Trash2 className="size-3.5" />{isDeleting ? "Deleting…" : "Delete"}</Button></div></Card>;
}
