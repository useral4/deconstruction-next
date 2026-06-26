"use client";

import { ChevronDown } from "lucide-react";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = { title: string; content: string };

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {items.map((item, index) => {
        const active = open === index;
        return (
          <AccordionRow
            key={item.title}
            item={item}
            active={active}
            onToggle={() => setOpen(active ? null : index)}
          />
        );
      })}
    </div>
  );
}

function AccordionRow({
  item,
  active,
  onToggle,
}: {
  item: AccordionItem;
  active: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const panelId = `${id}-panel`;
  const triggerId = `${id}-trigger`;

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const updateHeight = () => {
      setHeight(active ? content.scrollHeight : 0);
    };

    updateHeight();

    if (!active || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(updateHeight);
    observer.observe(content);

    return () => observer.disconnect();
  }, [active, item.content]);

  return (
    <div>
      <button
        id={triggerId}
        className="flex w-full items-center justify-between gap-5 py-6 text-left"
        onClick={onToggle}
        aria-expanded={active}
        aria-controls={panelId}
      >
        <span className="text-ink text-lg font-black sm:text-xl">
          {item.title}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            active && "rotate-180",
          )}
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!active}
        className="overflow-hidden duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          height,
          opacity: active ? 1 : 0,
          transitionProperty: "height, opacity",
        }}
      >
        <div ref={contentRef} className="pb-6">
          <p
            className={cn(
              "max-w-4xl leading-7 text-stone-600 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              active ? "translate-y-0" : "-translate-y-2",
            )}
          >
            {item.content}
          </p>
        </div>
      </div>
    </div>
  );
}
