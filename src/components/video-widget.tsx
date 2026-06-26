"use client";

import { Maximize2, Play, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const widgetVideoSrc =
  "https://dl.dropboxusercontent.com/s/h56lzeioj4o4rac/Intelligent%20Demolition%20-%20Brokk%20110.mp4?dl=0";

export function VideoWidget() {
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);

  if (!visible) return null;

  return (
    <>
      <aside className="bg-ink fixed bottom-5 left-4 z-40 hidden w-[184px] overflow-hidden rounded-2xl border border-white/15 shadow-2xl ring-1 shadow-black/30 ring-black/10 md:block">
        <div className="relative aspect-[0.82] bg-black">
          <Image
            src="/media/brokk-110.webp"
            alt=""
            fill
            sizes="184px"
            className="object-contain p-4 opacity-95"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
          <button
            type="button"
            aria-label="Смотреть видео"
            onClick={() => setExpanded(true)}
            className="hover:bg-brand hover:text-ink absolute inset-0 m-auto grid size-12 place-items-center rounded-full bg-black/65 text-white backdrop-blur transition"
          >
            <Play className="size-5 fill-current" />
          </button>
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              aria-label="Развернуть видео"
              onClick={() => setExpanded(true)}
              className="hover:bg-brand hover:text-ink grid size-8 place-items-center rounded-full bg-black/65 text-white backdrop-blur transition"
            >
              <Maximize2 className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Закрыть видео"
              onClick={() => setVisible(false)}
              className="hover:bg-brand hover:text-ink grid size-8 place-items-center rounded-full bg-black/65 text-white backdrop-blur transition"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
        <Link
          href="/#calculator"
          className="bg-brand text-ink hover:bg-brand-soft block px-4 py-3 text-center text-[0.72rem] leading-4 font-black tracking-[0.08em] uppercase transition"
        >
          Заказать демонтажного робота
        </Link>
      </aside>

      {expanded && (
        <div className="fixed inset-0 z-[120] grid place-items-center bg-black/92 p-4 backdrop-blur-md">
          <button
            type="button"
            aria-label="Закрыть полноэкранное видео"
            onClick={() => setExpanded(false)}
            className="hover:bg-brand hover:text-ink absolute top-5 right-5 z-10 grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition"
          >
            <X />
          </button>
          <video
            loop
            autoPlay
            muted
            playsInline
            controls
            preload="metadata"
            controlsList="nodownload"
            disablePictureInPicture
            className="max-h-[92vh] w-full max-w-5xl rounded-3xl object-contain shadow-2xl"
          >
            <source src={widgetVideoSrc} type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
}
