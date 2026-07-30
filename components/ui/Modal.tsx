"use client";

import { type ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
}

export function Modal({ children, isOpen, onClose, title, className }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
      <button className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm" aria-label="Close modal" onClick={onClose} />
      <section role="dialog" aria-modal="true" aria-labelledby="modal-title" className={cn("relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl", className)}>
        <div className="mb-5 flex items-center justify-between gap-4"><h2 id="modal-title" className="text-lg font-bold text-white">{title}</h2><button className="rounded-lg p-1 text-zinc-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-lime-300" onClick={onClose} aria-label="Close modal"><X className="size-5" /></button></div>
        {children}
      </section>
    </div>
  );
}
