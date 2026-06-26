"use client";

import { ArrowRight, Check, Phone } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
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
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 74,
    damping: 24,
    mass: 0.18,
  });

  const robotRotate = useTransform(
    smoothProgress,
    [0, 0.32, 0.52, 0.78],
    ["0deg", "-4.5deg", "2deg", "0deg"],
  );
  const robotY = useTransform(smoothProgress, [0, 0.36, 0.62], [0, 18, 4]);
  const robotX = useTransform(smoothProgress, [0, 0.74], [0, -26]);
  const robotScale = useTransform(smoothProgress, [0, 0.74], [1, 1.035]);
  const impactOpacity = useTransform(
    smoothProgress,
    [0.18, 0.36, 0.56],
    [0, 0.86, 0],
  );
  const impactScale = useTransform(
    smoothProgress,
    [0.18, 0.38, 0.56],
    [0.72, 1.12, 1.3],
  );
  const circleOpacity = useTransform(
    smoothProgress,
    [0.44, 0.56, 0.88],
    [0, 0.86, 1],
  );
  const circleScale = useTransform(smoothProgress, [0.44, 0.9], [0.18, 15]);
  const contentOpacity = useTransform(smoothProgress, [0.58, 0.84], [1, 0.14]);
  const contentY = useTransform(smoothProgress, [0.52, 0.86], [0, -28]);

  const motionEnabled = !reduceMotion;

  return (
    <section
      ref={ref}
      className="hero-excavator-scene relative isolate h-[138vh] min-h-[860px] overflow-clip bg-[#f4f2ed]"
    >
      <div className="sticky top-0 min-h-screen overflow-hidden">
        <div className="bg-brand absolute inset-y-0 right-0 z-0 w-[38%] lg:w-[43%]" />
        <div className="absolute top-16 -right-20 z-0 hidden size-[680px] rounded-full border border-black/10 lg:block" />

        <motion.div
          aria-hidden
          className="hero-excavator-circle bg-ink pointer-events-none absolute right-[11%] bottom-[10%] z-[5] size-28 rounded-full shadow-[0_0_80px_rgba(32,32,32,0.26)] sm:right-[19%] sm:bottom-[12%] sm:size-36"
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
          className="hero-excavator-robot pointer-events-none absolute right-[-26vw] bottom-[-2rem] z-10 aspect-square w-[88vw] max-w-[760px] origin-[62%_78%] sm:right-[-12vw] sm:w-[64vw] lg:right-[-2%] lg:w-[48vw]"
          style={
            motionEnabled
              ? {
                  rotate: robotRotate,
                  x: robotX,
                  y: robotY,
                  scale: robotScale,
                }
              : undefined
          }
        >
          <Image
            src="/media/hero-robot.webp"
            alt="Демонтажный робот Brokk"
            fill
            priority
            sizes="(max-width: 1024px) 80vw, 48vw"
            className="object-contain drop-shadow-[0_30px_60px_rgba(32,32,32,0.22)]"
          />
        </motion.div>

        <motion.div
          aria-hidden
          className="hero-excavator-impact pointer-events-none absolute right-[11%] bottom-[7%] z-[11] h-16 w-20 rounded-[100%] bg-black/18 blur-xl sm:right-[21%] sm:bottom-[10%]"
          style={
            motionEnabled
              ? { opacity: impactOpacity, scale: impactScale }
              : { opacity: 0 }
          }
        />
        <motion.div
          aria-hidden
          className="hero-excavator-spark bg-brand-dark pointer-events-none absolute right-[18%] bottom-[15%] z-[12] h-14 w-1 origin-bottom rounded-full shadow-[0_0_28px_rgba(255,205,0,0.62)] sm:right-[27%] sm:bottom-[17%]"
          style={
            motionEnabled
              ? { opacity: impactOpacity, scaleY: impactScale }
              : { opacity: 0 }
          }
        />
      </div>
    </section>
  );
}
