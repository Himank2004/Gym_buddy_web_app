"use client";

import { AlertTriangle } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function DeleteAccountForm() {
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState<string>();
  const [isDeleting, setIsDeleting] = useState(false);
  const canDelete = confirmation === "DELETE";
  const deleteAccount = async () => {
    if (!canDelete) return;
    setError(undefined); setIsDeleting(true);
    try {
      const response = await fetch("/api/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmation }),
      });
      if (!response.ok) { setError("Unable to delete your account. Please try again."); setIsDeleting(false); return; }
      await signOut({ callbackUrl: "/" });
    } catch {
      setError("Unable to delete your account. Check your connection and try again.");
      setIsDeleting(false);
    }
  };

  return <div className="space-y-5"><div className="flex gap-3 rounded-xl border border-rose-400/20 bg-rose-400/8 p-4"><AlertTriangle className="mt-0.5 size-5 shrink-0 text-rose-300" /><p className="text-sm leading-6 text-zinc-300">This action permanently deletes your account, profile, workout logs, food logs, chat messages, and goals. It cannot be undone.</p></div><Input label='Type "DELETE" to confirm' value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="off" />{error && <p className="text-sm text-rose-300" role="alert">{error}</p>}<Button variant="danger" className="w-full" disabled={!canDelete || isDeleting} onClick={deleteAccount}>{isDeleting ? "Deleting account…" : "Permanently delete account"}</Button></div>;
}
