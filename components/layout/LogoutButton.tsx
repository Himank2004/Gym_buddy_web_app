"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      variant="ghost"
      className="h-9 gap-2 px-3 text-xs"
      disabled={isLoading}
      onClick={async () => {
        setIsLoading(true);
        await signOut({ callbackUrl: "/" });
      }}
    >
      <LogOut className="size-4" />
      {isLoading ? "Signing out…" : "Logout"}
    </Button>
  );
}
