import { Bot, ChartNoAxesCombined, Dumbbell, Plus, Utensils } from "lucide-react";
import Link from "next/link";

const actions = [
  { label: "Log Workout", description: "Record a training session", href: "/dashboard/exercises", icon: Dumbbell },
  { label: "Add Food", description: "Track your next meal", href: "/dashboard/nutrition", icon: Utensils },
  { label: "Ask Diet Bot", description: "Get nutrition guidance", href: "/dashboard/chatbot", icon: Bot },
  { label: "View Progress", description: "See your momentum", href: "/dashboard/profile", icon: ChartNoAxesCombined },
];

export function QuickActions() {
  return (
    <section><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-black text-white">Quick actions</h2><Plus className="size-4 text-lime-300" /></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{actions.map(({ label, description, href, icon: Icon }) => <Link key={label} href={href} className="group rounded-2xl border border-white/10 bg-zinc-900/60 p-4 transition hover:-translate-y-1 hover:border-lime-300/30 hover:bg-zinc-900"><Icon className="size-5 text-lime-300 transition group-hover:scale-110" /><h3 className="mt-5 font-bold text-white">{label}</h3><p className="mt-1 text-sm text-zinc-500">{description}</p></Link>)}</div></section>
  );
}
