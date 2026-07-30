import { FileText, ShieldCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteAccountForm } from "@/components/profile/DeleteAccountForm";
import { SettingsForm } from "@/components/profile/SettingsForm";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/ErrorState";
import { LogoutButton } from "@/components/layout/LogoutButton";
import { getCurrentUser } from "@/lib/auth";
import { getUserProfile } from "@/lib/profile";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const profile = await getUserProfile(user.id);
  if (!profile) return <ErrorState title="Profile unavailable" description="We could not load your account settings." />;
  const initialValues = { name: profile.name, goal: profile.goal ?? "", age: profile.age ?? undefined, heightCm: profile.heightCm ?? undefined, weightKg: profile.weightKg ?? undefined, activityLevel: profile.activityLevel ?? "", dailyCalorieGoal: profile.dailyCalorieGoal, dailyProteinGoal: profile.dailyProteinGoal, dailyCarbsGoal: profile.dailyCarbsGoal, dailyFatsGoal: profile.dailyFatsGoal };

  return <div className="mx-auto max-w-4xl space-y-8"><section><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Account</p><h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Settings</h1><p className="mt-2 text-zinc-400">Manage your profile, nutrition targets, and account preferences.</p></section><Card title="Account information" description={`${profile.email} · Your sign-in email cannot be changed here.`}><SettingsForm initialValues={initialValues} /></Card><section className="grid gap-4 md:grid-cols-2"><Card title="Privacy and terms" description="Understand how FitForge handles your information."><div className="mt-4 grid gap-2"><Link href="/privacy" className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-3 text-sm font-bold text-zinc-300 transition hover:bg-white/8 hover:text-white"><ShieldCheck className="size-4 text-lime-300" />Privacy Policy</Link><Link href="/terms" className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-3 text-sm font-bold text-zinc-300 transition hover:bg-white/8 hover:text-white"><FileText className="size-4 text-lime-300" />Terms of Use</Link></div></Card><Card title="Session" description="Sign out securely from this browser."><div className="mt-4"><LogoutButton /></div></Card></section><Card title="Delete account" description="Permanently remove your FitForge account and app data." className="border-rose-400/20"><Link href="/dashboard/settings/delete-account" className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-rose-200 hover:text-rose-100"><Trash2 className="size-4" />Open full deletion page</Link><details><summary className="cursor-pointer list-none rounded-xl border border-rose-400/20 px-4 py-3 text-sm font-bold text-rose-200 transition hover:bg-rose-400/8"><span className="inline-flex items-center gap-2"><Trash2 className="size-4" />Open account deletion</span></summary><div className="mt-5"><DeleteAccountForm /></div></details></Card></div>;
}
