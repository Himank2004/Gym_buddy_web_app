import { ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { EditFoodLogForm } from "@/components/nutrition/EditFoodLogForm";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/ErrorState";
import { getCurrentUser } from "@/lib/auth";
import { getFoodLogById } from "@/lib/nutrition";

function toDateTimeLocal(date: Date) {
  const local = new Date(date);
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toISOString().slice(0, 16);
}

export default async function EditFoodLogPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { id } = await params;
  let foodLog;
  try {
    foodLog = await getFoodLogById(user.id, id);
  } catch {
    return <ErrorState title="Unable to load food log" description="Check your database connection and try again." />;
  }

  if (!foodLog) notFound();
  const initialValues = { foodName: foodLog.foodName, quantity: foodLog.quantity, servingUnit: foodLog.servingUnit, calories: foodLog.calories, proteinG: foodLog.proteinG, carbsG: foodLog.carbsG, fatsG: foodLog.fatsG, mealType: foodLog.mealType, consumedAt: toDateTimeLocal(foodLog.consumedAt) };
  return <div className="mx-auto max-w-3xl"><Link href="/dashboard/nutrition" className="inline-flex items-center gap-2 text-sm font-bold text-lime-300 transition hover:text-lime-200"><ArrowLeft className="size-4" />Back to nutrition</Link><section className="mt-7"><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Food log</p><h1 className="mt-2 flex items-center gap-3 text-3xl font-black tracking-tight text-white sm:text-4xl"><span className="rounded-xl bg-lime-300/10 p-2 text-lime-300"><Pencil className="size-6" /></span>Edit {foodLog.foodName}</h1><p className="mt-3 text-zinc-400">Adjust the details to keep today’s nutrition accurate.</p></section><Card className="mt-8 p-5 sm:p-7"><EditFoodLogForm id={foodLog.id} initialValues={initialValues} /></Card></div>;
}
