import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-brand text-ink inline-flex items-center rounded-full px-3 py-1 text-xs font-black tracking-[.14em] uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
