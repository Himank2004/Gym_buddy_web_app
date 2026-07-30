interface PlaceholderPageProps {
  title: string;
  description: string;
  eyebrow?: string;
}

export function PlaceholderPage({ title, description, eyebrow = "FitForge" }: PlaceholderPageProps) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center rounded-3xl border border-dashed border-white/12 bg-zinc-900/45 p-8 text-center">
      <div className="max-w-lg"><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">{eyebrow}</p><h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h1><p className="mt-4 leading-7 text-zinc-400">{description}</p><span className="mt-7 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-400">Coming soon</span></div>
    </section>
  );
}
