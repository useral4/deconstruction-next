import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "text-ink focus:border-brand focus:ring-brand/15 h-13 w-full rounded-xl border border-black/10 bg-white px-4 text-base transition outline-none placeholder:text-stone-400 focus:ring-4",
        className,
      )}
      {...props}
    />
  );
});
