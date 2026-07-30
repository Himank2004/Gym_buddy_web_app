import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DeleteAccountForm } from "@/components/profile/DeleteAccountForm";
import { Card } from "@/components/ui/Card";

export default function DeleteAccountPage() {
  return <div className="mx-auto max-w-2xl"><Link href="/dashboard/settings" className="inline-flex items-center gap-2 text-sm font-bold text-lime-300 transition hover:text-lime-200"><ArrowLeft className="size-4" />Back to settings</Link><section className="mt-7"><p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-300">Danger zone</p><h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Delete your account</h1><p className="mt-3 text-zinc-400">This is permanent. Take a moment to review what will be removed.</p></section><Card className="mt-8 border-rose-400/20"><DeleteAccountForm /></Card></div>;
}
