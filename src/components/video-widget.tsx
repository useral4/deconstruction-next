"use client";

import { Maximize2, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const widgetVideoSrc =
  "https://dl.dropboxusercontent.com/s/h56lzeioj4o4rac/Intelligent%20Demolition%20-%20Brokk%20110.mp4?dl=0";

export function VideoWidget() {
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // If autoplay is blocked, the widget still keeps a useful first frame.
    });
  }, []);

  if (!visible) return null;

  return (
    <>
      <aside className="bg-ink fixed bottom-5 left-4 z-40 hidden w-[184px] overflow-hidden rounded-2xl border border-white/15 shadow-2xl ring-1 shadow-black/30 ring-black/10 md:block">
        <div className="relative aspect-[0.82] bg-black">
          <video
            ref={videoRef}
            loop
            autoPlay
            muted
            playsInline
            preload="auto"
            controlsList="nodownload"
            disablePictureInPicture
            className="size-full object-cover opacity-95"
          >
            <source src={widgetVideoSrc} type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
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
            preload="auto"
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
