"use client";

import { ArrowRight, Check, Phone } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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

const heroVideoSrc = "/media/hero-demolition-scroll.mp4";

export function HeroExcavator() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const [duration, setDuration] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 26,
    mass: 0.2,
  });

  const videoY = useTransform(progress, [0, 1], [0, -34]);
  const videoScale = useTransform(progress, [0, 0.74], [1, 1.035]);
  const videoRadius = useTransform(progress, [0, 0.75], ["2rem", "2.8rem"]);
  const contentOpacity = useTransform(progress, [0.62, 0.9], [1, 0.08]);
  const contentY = useTransform(progress, [0.58, 0.9], [0, -34]);
  const circleOpacity = useTransform(progress, [0.58, 0.68, 0.94], [0, 0.9, 1]);
  const circleScale = useTransform(progress, [0.58, 0.94], [0.18, 18]);
  const glowOpacity = useTransform(
    progress,
    [0.12, 0.34, 0.72],
    [0.22, 0.58, 0.2],
  );

  const motionEnabled = !reduceMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0.01;
  }, [duration]);

  useMotionValueEvent(progress, "change", (value) => {
    const video = videoRef.current;
    if (!video || !duration || reduceMotion) return;

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      const safeDuration = Math.max(duration - 0.05, 0);
      video.pause();
      video.currentTime = Math.min(
        Math.max(value * safeDuration, 0.01),
        safeDuration,
      );
    });
  });

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-excavator-scene relative isolate h-[142vh] min-h-[880px] overflow-clip bg-[#f4f2ed]"
    >
      <div className="sticky top-0 min-h-screen overflow-hidden">
        <div className="bg-brand absolute inset-y-0 right-0 z-0 w-[38%] lg:w-[43%]" />
        <div className="absolute top-16 -right-20 z-0 hidden size-[680px] rounded-full border border-black/10 lg:block" />

        <motion.div
          aria-hidden
          className="hero-excavator-circle bg-ink pointer-events-none absolute right-[12%] bottom-[11%] z-30 size-28 rounded-full shadow-[0_0_90px_rgba(32,32,32,0.22)] sm:right-[20%] sm:size-36 lg:right-[24%]"
          style={
            motionEnabled
              ? { opacity: circleOpacity, scale: circleScale }
              : { opacity: 0 }
          }
        />

        <motion.div
          className="hero-excavator-content site-container relative z-20 flex min-h-screen items-start py-20 sm:py-28"
          style={
            motionEnabled ? { opacity: contentOpacity, y: contentY } : undefined
          }
        >
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
        </motion.div>

        <motion.div
          className="hero-excavator-video pointer-events-none absolute right-[-29vw] bottom-6 z-10 w-[92vw] max-w-[820px] sm:right-[-12vw] sm:bottom-10 sm:w-[66vw] lg:right-[2%] lg:bottom-12 lg:w-[45vw]"
          style={motionEnabled ? { y: videoY, scale: videoScale } : undefined}
        >
          <motion.div
            className="bg-ink relative aspect-[11/12] overflow-hidden shadow-[0_34px_90px_rgba(32,32,32,0.24)] ring-1 ring-black/10 sm:aspect-[4/3] lg:aspect-[10/11]"
            style={motionEnabled ? { borderRadius: videoRadius } : undefined}
          >
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="size-full object-cover"
              onLoadedMetadata={(event) => {
                const video = event.currentTarget;
                setDuration(video.duration || 0);
                video.pause();
                video.currentTime = 0.01;
              }}
            >
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,205,0,0.2),transparent_42%),linear-gradient(180deg,transparent_58%,rgba(0,0,0,0.32))]" />
          </motion.div>

          <motion.div
            aria-hidden
            className="bg-brand pointer-events-none absolute -right-8 -bottom-8 size-32 rounded-full blur-3xl"
            style={motionEnabled ? { opacity: glowOpacity } : undefined}
          />
        </motion.div>
      </div>
    </section>
  );
}
