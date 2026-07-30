"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export interface FoodOption { id: string; name: string; servingSize: string; calories: number; proteinG: number; carbsG: number; fatsG: number; }

export function FoodSearchPicker({ foods, onSelect }: { foods: FoodOption[]; onSelect: (food: FoodOption) => void }) {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => foods.filter((food) => food.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6), [foods, query]);

  return <div className="relative min-w-0"><label className="block text-sm font-medium text-zinc-200" htmlFor="food-search">Choose a common food</label><div className="relative mt-2"><Search className="pointer-events-none absolute left-3 top-3.5 size-4 text-zinc-500" /><input id="food-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search rice, chicken, oats..." className="h-11 w-full rounded-xl border border-white/10 bg-zinc-950 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-zinc-500 hover:border-white/20 focus:border-lime-300 focus:ring-2 focus:ring-lime-300/15" /></div>{query && <div className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-white/10 bg-zinc-900 p-1 shadow-xl">{matches.length ? matches.map((food) => <button key={food.id} type="button" onClick={() => { onSelect(food); setQuery(food.name); }} className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-white/8"><span className="min-w-0 truncate text-sm font-semibold text-white">{food.name}</span><span className="shrink-0 text-xs text-zinc-500">{food.calories} kcal · {food.servingSize}</span></button>) : <p className="px-3 py-3 text-sm text-zinc-500">No common foods found.</p>}</div>}</div>;
}
