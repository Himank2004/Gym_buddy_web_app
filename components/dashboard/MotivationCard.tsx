import { Quote } from "lucide-react";

export function MotivationCard({ message }: { message: string }) {
  return <section className="relative overflow-hidden rounded-3xl border border-lime-300/20 bg-gradient-to-br from-lime-300/14 via-zinc-900 to-zinc-950 p-6 sm:p-8"><div className="absolute -right-12 -top-12 size-44 rounded-full bg-lime-300/10 blur-3xl" /><Quote className="relative size-7 text-lime-300" /><p className="relative mt-5 max-w-2xl text-xl font-bold leading-8 text-white sm:text-2xl">{message}</p><p className="relative mt-4 text-sm text-lime-200">Small actions, repeated daily, forge lasting results.</p></section>;
}
