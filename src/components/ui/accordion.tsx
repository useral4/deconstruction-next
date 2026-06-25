"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = { title: string; content: string };

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {items.map((item, index) => {
        const active = open === index;
        return (
          <div key={item.title}>
            <button
              className="flex w-full items-center justify-between gap-5 py-6 text-left"
              onClick={() => setOpen(active ? null : index)}
              aria-expanded={active}
            >
              <span className="text-ink text-lg font-black sm:text-xl">
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 transition-transform",
                  active && "rotate-180",
                )}
              />
            </button>
            {active && (
              <p className="max-w-4xl pb-6 leading-7 text-stone-600">
                {item.content}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
