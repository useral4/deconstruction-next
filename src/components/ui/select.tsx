import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "text-ink focus:border-brand focus:ring-brand/15 h-13 w-full rounded-xl border border-black/10 bg-white px-4 text-base transition outline-none focus:ring-4",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});
