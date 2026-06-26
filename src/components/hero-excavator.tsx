"use client";

import { ArrowRight, Check, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const heroPoints = [
  "Бесплатный выезд инженера",
  "Собственный парк техники",
  "Проект и смета под ключ",
  "Работа на сложных объектах",
];

export function HeroExcavator() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadVideo = () => setVideoReady(true);
    const browserWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (browserWindow.requestIdleCallback && browserWindow.cancelIdleCallback) {
      const idleId = browserWindow.requestIdleCallback(loadVideo, {
        timeout: 2500,
      });

      return () => {
        browserWindow.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = window.setTimeout(loadVideo, 1800);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!videoReady) return;

    const video = videoRef.current;
    if (!video) return;

    video.load();
    video.play().catch(() => {
      // Muted autoplay can still be blocked in rare browser states.
      // In that case the poster remains as the visual fallback.
    });
  }, [videoReady]);

  return (
    <section className="hero-excavator-scene relative isolate min-h-screen overflow-hidden bg-[#f4f2ed]">
      <div className="hero-video-panel pointer-events-none absolute inset-y-0 right-0 z-0 w-full opacity-20 sm:opacity-30 lg:w-[56vw] lg:opacity-100">
        <video
          ref={videoRef}
          aria-hidden="true"
          autoPlay
          disablePictureInPicture
          disableRemotePlayback
          loop
          muted
          playsInline
          poster="/media/hero-robot.webp"
          preload="none"
          tabIndex={-1}
          controlsList="nodownload nofullscreen noremoteplayback"
          className="size-full object-cover"
        >
          {videoReady && (
            <source src="/media/hero-demolition-scroll.mp4" type="video/mp4" />
          )}
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f4f2ed]/95 via-[#f4f2ed]/60 to-[#f4f2ed]/10 lg:hidden" />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[48%] bg-[linear-gradient(90deg,#f4f2ed_0%,rgba(244,242,237,0.96)_24%,rgba(244,242,237,0.68)_58%,rgba(244,242,237,0)_100%)] lg:block" />
      </div>

      <div className="site-container relative z-10 flex min-h-screen items-start py-20 sm:py-28">
        <div className="max-w-3xl">
          <Badge>20+ лет в демонтаже</Badge>
          <h1 className="font-display text-ink mt-6 text-[clamp(3.2rem,7.6vw,7.2rem)] leading-[0.82] font-black tracking-[-0.04em] text-balance uppercase">
            Демонтаж
            <span className="text-brand text-stroke block">без лишнего</span>
            риска
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-stone-700 sm:text-xl">
            Разборка, снос и реконструкция роботами Brokk. Работаем в
            Санкт-Петербурге, Москве и по всей России.
          </p>
          <ul className="mt-7 grid max-w-xl gap-3 text-sm font-bold sm:grid-cols-2">
            {heroPoints.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="bg-brand grid size-6 place-items-center rounded-md">
                  <Check className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#calculator" size="lg">
              Рассчитать стоимость
              <ArrowRight className="size-5" />
            </ButtonLink>
            <ButtonLink href={siteConfig.phoneHref} variant="dark" size="lg">
              <Phone className="size-5" />
              Позвонить
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
