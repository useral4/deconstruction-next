"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLockBody } from "@/hooks/use-lock-body";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  useLockBody(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div className="relative my-8 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-9">
        <button
          onClick={onClose}
          className="hover:bg-brand absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-stone-100 transition"
          aria-label="Закрыть"
        >
          <X className="size-5" />
        </button>
        <h2 className="font-display text-ink pr-12 text-3xl font-black uppercase">
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
