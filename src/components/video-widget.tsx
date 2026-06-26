"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const widgetVideoSrc =
  "https://dl.dropboxusercontent.com/s/h56lzeioj4o4rac/Intelligent%20Demolition%20-%20Brokk%20110.mp4?dl=0";

export function VideoWidget() {
  const [visible, setVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 0.75;
    video.play().catch(() => {
      // If autoplay is blocked, the widget still keeps a useful first frame.
    });
  }, []);

  if (!visible) return null;

  return (
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
        <button
          type="button"
          aria-label="Закрыть видео"
          onClick={() => setVisible(false)}
          className="hover:bg-brand hover:text-ink absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-black/65 text-white backdrop-blur transition"
        >
          <X className="size-4" />
        </button>
      </div>
      <Link
        href="/#calculator"
        className="bg-brand text-ink hover:bg-brand-soft block px-4 py-3 text-center text-[0.72rem] leading-4 font-black tracking-[0.08em] uppercase transition"
      >
        Заказать демонтажного робота
      </Link>
    </aside>
  );
}
