import Link from "next/link";

const sections = [
  ["Using FitForge", "FitForge is a personal fitness tracking application. You are responsible for the information you enter and for using the app in a way that is appropriate for your individual circumstances."],
  ["Fitness and nutrition guidance", "Any training, nutrition, or chatbot guidance in FitForge is general educational information only. It is not medical advice, diagnosis, or treatment."],
  ["When to seek professional advice", "Consult a qualified healthcare professional before changing your exercise or nutrition routine if you have a medical condition, injury, eating disorder, are pregnant, or have special dietary needs."],
  ["Account responsibilities", "Keep your account credentials secure and use the account deletion controls if you no longer want FitForge to retain your app data."],
];

export default function TermsPage() {
  return <main className="min-h-screen px-5 py-8 sm:px-8 sm:py-10"><div className="mx-auto max-w-3xl"><nav className="flex items-center justify-between border-b border-white/8 pb-6" aria-label="Legal navigation"><Link href="/" className="text-xl font-black text-white">Fit<span className="text-lime-300">Forge</span></Link><Link href="/privacy" className="text-sm font-semibold text-zinc-400 transition hover:text-white">Privacy</Link></nav><section className="py-12 sm:py-16"><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Terms of Use</p><h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">Train with clarity and care.</h1><p className="mt-5 max-w-2xl leading-8 text-zinc-400">These terms describe the general conditions for using FitForge.</p><div className="mt-10 space-y-4">{sections.map(([title, content]) => <section key={title} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 sm:p-6"><h2 className="text-xl font-black text-white">{title}</h2><p className="mt-3 leading-7 text-zinc-400">{content}</p></section>)}</div></section><footer className="border-t border-white/8 py-7 text-sm text-zinc-500">© {new Date().getFullYear()} FitForge. Built for progress.</footer></div></main>;
}
