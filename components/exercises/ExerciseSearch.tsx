import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

export function ExerciseSearch({ defaultValue }: { defaultValue?: string }) {
  return <div className="relative"><Search className="pointer-events-none absolute left-3 top-3.5 size-4 text-zinc-500" aria-hidden="true" /><Input name="search" aria-label="Search exercises" placeholder="Search exercises" defaultValue={defaultValue} className="pl-9" /></div>;
}
