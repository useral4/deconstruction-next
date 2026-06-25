"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/cn";

export function Tabs({
  items,
}: {
  items: Array<{ label: string; content: ReactNode }>;
}) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist">
        {items.map((item, index) => (
          <button
            key={item.label}
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={cn(
              "rounded-full px-5 py-3 text-sm font-bold tracking-wider uppercase transition",
              active === index
                ? "bg-brand text-ink"
                : "hover:text-ink bg-stone-100 text-stone-500",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-6" role="tabpanel">
        {items[active]?.content}
      </div>
    </div>
  );
}
