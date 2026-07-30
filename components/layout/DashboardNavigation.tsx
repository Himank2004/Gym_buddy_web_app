"use client";

import { Bot, Dumbbell, LayoutDashboard, Settings, UserRound, Utensils } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/exercises", label: "Exercises", icon: Dumbbell },
  { href: "/dashboard/nutrition", label: "Nutrition", icon: Utensils },
  { href: "/dashboard/chatbot", label: "Chatbot", icon: Bot },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  return href === "/dashboard" ? pathname === href : pathname.startsWith(href);
}

export function DashboardNavigation({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav aria-label={mobile ? "Mobile dashboard navigation" : "Dashboard navigation"} className={cn(mobile ? "grid grid-cols-6" : "space-y-1")}>
      {links.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);

        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-xl text-sm font-semibold transition",
              mobile ? "min-w-0 flex-col px-0.5 py-2 text-[9px] leading-3 sm:text-[10px]" : "px-3 py-2.5",
              active ? "bg-lime-300 text-zinc-950" : "text-zinc-400 hover:bg-white/7 hover:text-white",
            )}
          >
            <Icon className={cn("size-4 shrink-0", mobile && "size-4")} />
            <span className={cn(mobile && "w-full truncate text-center")}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
