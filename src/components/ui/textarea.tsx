import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "text-ink focus:border-brand focus:ring-brand/15 min-h-28 w-full resize-y rounded-xl border border-black/10 bg-white p-4 text-base transition outline-none placeholder:text-stone-400 focus:ring-4",
        className,
      )}
      {...props}
    />
  );
});
