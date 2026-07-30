import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ExerciseNotFound() {
  return <EmptyState title="Exercise not found" description="This exercise may have been removed or the link is invalid." action={<Link href="/dashboard/exercises" className="text-sm font-bold text-lime-300 hover:text-lime-200">Back to exercise library</Link>} />;
}
