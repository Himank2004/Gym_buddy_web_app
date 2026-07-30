import Link from "next/link";
import { ArrowRight, Bot, ChartNoAxesCombined, CheckCircle2, Dumbbell, Flame, Salad, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  { title: "Exercise Library", description: "Train with a focused library built for every goal and experience level.", icon: Dumbbell },
  { title: "Workout Tracking", description: "Log sets, reps, and personal bests without losing your momentum.", icon: Flame },
  { title: "Calories and Macros", description: "Make food choices with a clear view of your daily nutrition.", icon: Salad },
  { title: "AI Diet Chatbot", description: "Get thoughtful nutrition guidance whenever your next meal needs a plan.", icon: Bot },
  { title: "Progress Dashboard", description: "See your consistency, strength, and body goals moving forward.", icon: ChartNoAxesCombined },
];

const steps = ["Choose exercises", "Log workouts", "Track food", "Improve with insights"];
const primaryLink = "inline-flex h-11 items-center justify-center rounded-xl bg-lime-300 px-5 text-sm font-bold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-lime-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300";
const secondaryLink = "inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/8 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <nav className="flex h-20 items-center justify-between" aria-label="Main navigation">
          <Link href="/" className="text-xl font-black tracking-tight text-white">Fit<span className="text-lime-300">Forge</span></Link>
          <div className="flex items-center gap-2 sm:gap-4"><Link href="/login" className="rounded-lg px-2 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/6 hover:text-white focus-visible:outline-2 focus-visible:outline-lime-300">Login</Link><Link href="/register" className={cn(primaryLink, "h-10 px-3 sm:px-4")}>Get Started</Link></div>
        </nav>

        <section className="relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="absolute -left-48 -top-24 size-96 rounded-full bg-lime-300/10 blur-3xl" />
          <div className="relative"><p className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/8 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-lime-200"><Sparkles className="size-3.5" /> One place. Every goal.</p><h1 className="max-w-3xl text-5xl font-black tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">Build strength. <span className="text-lime-300">Master nutrition.</span> Track progress.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">FitForge helps you log workouts, track calories, get diet guidance, and see your strength grow.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/register" className={primaryLink}>Get Started <ArrowRight className="ml-2 size-4" /></Link><Link href="/login" className={secondaryLink}>Login</Link></div></div>
          <div className="relative rounded-3xl border border-white/10 bg-zinc-900/75 p-5 shadow-2xl shadow-black/40 backdrop-blur sm:p-7"><div className="absolute inset-x-12 -top-px h-px bg-gradient-to-r from-transparent via-lime-300/70 to-transparent" /><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-zinc-400">This week</p><p className="mt-1 text-3xl font-black text-white">4 <span className="text-base font-medium text-zinc-500">workouts</span></p></div><div className="rounded-2xl bg-lime-300 p-3 text-zinc-950"><Dumbbell className="size-6" /></div></div><div className="mt-8 grid grid-cols-7 gap-2">{[72, 55, 86, 42, 100, 64, 25].map((height, index) => <div key={index} className="flex h-28 items-end"><div className="w-full rounded-t-md bg-gradient-to-t from-lime-400 to-emerald-200/65" style={{ height: `${height}%` }} /></div>)}</div><div className="mt-5 flex items-center justify-between border-t border-white/8 pt-5"><div><p className="text-sm font-semibold text-white">Strength score</p><p className="mt-1 text-xs text-zinc-500">+12% from last month</p></div><span className="text-2xl font-black text-lime-300">87</span></div></div>
        </section>

        <section className="py-16 sm:py-20"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Everything in rhythm</p><h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">A focused system for building your best body.</h2></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{features.map(({ title, description, icon: Icon }) => <article key={title} className="group rounded-2xl border border-white/10 bg-zinc-900/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-lime-300/30 hover:bg-zinc-900"><div className="inline-flex rounded-xl bg-lime-300/10 p-2.5 text-lime-300 transition group-hover:bg-lime-300 group-hover:text-zinc-950"><Icon className="size-5" /></div><h3 className="mt-5 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p></article>)}</div></section>

        <section className="grid gap-10 border-y border-white/8 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Simple by design</p><h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Momentum starts with the next move.</h2><p className="mt-4 text-zinc-400">A clear daily workflow keeps training and nutrition working together.</p></div><ol className="grid gap-3 sm:grid-cols-2">{steps.map((step, index) => <li key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lime-300 text-sm font-black text-zinc-950">0{index + 1}</span><span className="font-semibold text-zinc-100">{step}</span></li>)}</ol></section>

        <section className="py-16 sm:py-24"><div className="relative overflow-hidden rounded-3xl border border-lime-300/20 bg-gradient-to-br from-lime-300/20 via-zinc-900 to-zinc-950 px-6 py-14 text-center sm:px-12"><div className="absolute inset-x-1/4 top-0 h-px bg-lime-200/70" /><CheckCircle2 className="mx-auto size-7 text-lime-300" /><h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-5xl">Your next personal best starts today.</h2><p className="mx-auto mt-4 max-w-xl text-zinc-300">Bring your workouts, nutrition, and progress into a single disciplined routine.</p><Link href="/register" className={cn(primaryLink, "mt-8")}>Get Started <ArrowRight className="ml-2 size-4" /></Link></div></section>

        <footer className="flex flex-col gap-4 border-t border-white/8 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} FitForge. Built for progress.</p><div className="flex gap-5"><Link href="/privacy" className="transition hover:text-white">Privacy</Link><Link href="/terms" className="transition hover:text-white">Terms</Link></div></footer>
      </div>
    </main>
  );
}
