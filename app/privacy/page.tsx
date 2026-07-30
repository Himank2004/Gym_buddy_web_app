import Link from "next/link";

const sections = [
  ["Information we collect", "FitForge collects the name and email address you provide, optional profile fitness details such as age, height, weight, goal, and activity level, plus the workout logs, food logs, and chat messages you choose to create."],
  ["Why we collect it", "We use this information to operate your account, show your training and nutrition progress, personalize goals, and provide context-aware fitness and nutrition guidance."],
  ["How information is used", "Your data is used to provide FitForge features such as workout history, macro calculations, progress charts, and chat responses. We do not sell your personal information."],
  ["Deletion requests", "You can permanently delete your account and associated app data from Settings. If you need help with a deletion request, contact support@fitforge.app."],
];

export default function PrivacyPage() {
  return <main className="min-h-screen px-5 py-8 sm:px-8 sm:py-10"><div className="mx-auto max-w-3xl"><nav className="flex items-center justify-between border-b border-white/8 pb-6" aria-label="Legal navigation"><Link href="/" className="text-xl font-black text-white">Fit<span className="text-lime-300">Forge</span></Link><Link href="/terms" className="text-sm font-semibold text-zinc-400 transition hover:text-white">Terms</Link></nav><section className="py-12 sm:py-16"><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Privacy Policy</p><h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">Your data, explained clearly.</h1><p className="mt-5 max-w-2xl leading-8 text-zinc-400">This policy explains how FitForge handles information used to provide the app.</p><div className="mt-10 space-y-4">{sections.map(([title, content]) => <section key={title} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 sm:p-6"><h2 className="text-xl font-black text-white">{title}</h2><p className="mt-3 leading-7 text-zinc-400">{content}</p></section>)}</div></section><footer className="border-t border-white/8 py-7 text-sm text-zinc-500">Questions? Contact <a className="text-lime-300 hover:text-lime-200" href="mailto:support@fitforge.app">support@fitforge.app</a>.</footer></div></main>;
}
