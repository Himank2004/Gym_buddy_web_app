import { type ReactNode } from "react";
import { DashboardNavigation } from "@/components/layout/DashboardNavigation";
import { LogoutButton } from "@/components/layout/LogoutButton";

interface DashboardShellProps {
  children: ReactNode;
  userName: string;
}

export function DashboardShell({ children, userName }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-zinc-950 lg:grid lg:grid-cols-[15rem_1fr]">
      <aside className="hidden h-screen border-r border-white/8 bg-zinc-900/50 p-5 lg:sticky lg:top-0 lg:block">
        <a href="/dashboard" className="mb-10 block text-xl font-black tracking-tight text-white">Fit<span className="text-lime-300">Forge</span></a>
        <DashboardNavigation />
      </aside>
      <div className="min-w-0 pb-24 lg:pb-0">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/8 bg-zinc-950/85 px-5 backdrop-blur sm:px-8">
          <div className="min-w-0"><p className="truncate text-sm font-bold text-white">Welcome, {userName}</p><p className="truncate text-xs text-zinc-500">Forge your progress today.</p></div>
          <LogoutButton />
        </header>
        <main className="mx-auto w-full max-w-7xl p-5 sm:p-8">{children}</main>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-zinc-900/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-2xl shadow-black/30 backdrop-blur lg:hidden"><DashboardNavigation mobile /></div>
    </div>
  );
}
