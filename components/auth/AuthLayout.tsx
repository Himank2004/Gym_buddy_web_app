import Link from "next/link";
import { type ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({ title, description, children, footer }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 sm:px-8">
      <div className="pointer-events-none absolute -left-24 top-0 size-72 rounded-full bg-lime-300/10 blur-3xl" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-10 block text-center text-2xl font-black tracking-tight text-white">
          Fit<span className="text-lime-300">Forge</span>
        </Link>
        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/90 to-zinc-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Built for progress</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
          <div className="mt-7">{children}</div>
        </section>
        <p className="mt-6 text-center text-sm text-zinc-400">{footer}</p>
      </div>
    </main>
  );
}
