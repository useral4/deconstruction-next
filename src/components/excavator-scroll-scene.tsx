"use client";

import { Gauge, HardHat, ShieldCheck, Sparkles, Wrench } from "lucide-react";
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

const benefits = [
  {
    icon: Gauge,
    title: "До 4× быстрее",
    text: "Роботы выполняют большой объём работ за смену и сокращают общий срок проекта.",
  },
  {
    icon: ShieldCheck,
    title: "Безопаснее",
    text: "Оператор управляет техникой дистанционно и остаётся вне опасной зоны.",
  },
  {
    icon: Wrench,
    title: "Для сложных условий",
    text: "Компактная техника работает внутри зданий, на перекрытиях и в ограниченном пространстве.",
  },
  {
    icon: Sparkles,
    title: "Точный результат",
    text: "Контролируемое разрушение снижает вибрацию и риск повреждения соседних конструкций.",
  },
];

export function ExcavatorScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 86,
    damping: 24,
    mass: 0.22,
  });

  const robotRotate = useTransform(
    progress,
    [0.15, 0.34, 0.5, 0.66],
    ["0deg", "-15deg", "7deg", "0deg"],
  );
  const robotY = useTransform(
    progress,
    [0.15, 0.34, 0.5, 0.66],
    [0, 26, -8, 0],
  );
  const robotX = useTransform(progress, [0.15, 0.5, 0.72], [0, -24, 12]);
  const groundLift = useTransform(progress, [0.26, 0.44, 0.62], [0, -16, 0]);
  const dustOpacity = useTransform(progress, [0.22, 0.38, 0.62], [0, 0.88, 0]);
  const dustScale = useTransform(
    progress,
    [0.22, 0.48, 0.62],
    [0.75, 1.18, 1.35],
  );
  const impactScale = useTransform(progress, [0.24, 0.38, 0.56], [0, 1, 0.2]);
  const circleScale = useTransform(progress, [0.54, 0.86], [0.2, 16]);
  const circleOpacity = useTransform(
    progress,
    [0.48, 0.58, 0.88],
    [0, 0.96, 1],
  );
  const sceneFade = useTransform(progress, [0.72, 0.88], [1, 0.12]);

  const motionEnabled = !prefersReducedMotion;

  return (
    <>
      <section
        id="excavator-scene"
        ref={sectionRef}
        className="excavator-scene bg-ink relative h-[188vh] min-h-[1180px] overflow-clip text-white"
      >
        <div className="sticky top-18 flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden py-10 lg:py-6">
          <motion.div
            aria-hidden
            className="excavator-circle bg-brand pointer-events-none absolute top-[57%] left-[68%] z-0 size-28 rounded-full blur-[0.2px] sm:size-36 lg:left-[64%]"
            style={
              motionEnabled
                ? { opacity: circleOpacity, scale: circleScale }
                : { opacity: 0 }
            }
          />
          <motion.div
            className="excavator-stage-content site-container relative z-10 grid items-center gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12"
            style={motionEnabled ? { opacity: sceneFade } : undefined}
          >
            <div className="max-w-2xl">
              <Badge className="bg-brand text-ink">Прокрутите ниже</Badge>
              <h2 className="font-display mt-6 text-4xl leading-[0.88] font-black text-balance uppercase sm:text-5xl lg:text-6xl xl:text-7xl">
                Робот начинает работу прямо на скролле
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/62">
                Никакой лишней суеты: техника мягко «включается», делает удар,
                поднимает пыль — и жёлтый круг раскрывает следующий блок.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-black tracking-[0.12em] text-white/55 uppercase">
                <span className="rounded-full border border-white/15 px-4 py-2">
                  scroll animation
                </span>
                <span className="rounded-full border border-white/15 px-4 py-2">
                  subtle motion
                </span>
              </div>
            </div>

            <div className="relative min-h-[320px] sm:min-h-[520px] lg:min-h-[560px]">
              <div className="absolute inset-x-2 bottom-16 h-2 rounded-full bg-white/10 shadow-[0_26px_60px_rgba(0,0,0,0.35)]" />
              <motion.div
                aria-hidden
                className="excavator-chip bg-brand/70 absolute right-[28%] bottom-[21%] z-20 h-10 w-24 rounded-[100%] blur-xl"
                style={
                  motionEnabled
                    ? { opacity: dustOpacity, scale: dustScale, y: groundLift }
                    : { opacity: 0 }
                }
              />
              <motion.div
                aria-hidden
                className="excavator-impact bg-brand absolute right-[32%] bottom-[23%] z-20 h-20 w-1 origin-bottom rounded-full shadow-[0_0_34px_rgba(255,205,0,0.7)]"
                style={
                  motionEnabled
                    ? { opacity: dustOpacity, scaleY: impactScale }
                    : { opacity: 0 }
                }
              />
              <motion.div
                aria-hidden
                className="excavator-dust pointer-events-none absolute right-[22%] bottom-[18%] z-20 size-40"
                style={
                  motionEnabled
                    ? { opacity: dustOpacity, scale: dustScale }
                    : { opacity: 0 }
                }
              >
                <span className="bg-brand/75 absolute top-10 left-4 size-3 rounded-full" />
                <span className="absolute top-5 left-16 size-2 rounded-full bg-white/55" />
                <span className="bg-brand/55 absolute top-16 right-10 size-2.5 rounded-full" />
                <span className="absolute right-4 bottom-12 size-4 rounded-full bg-white/30 blur-[1px]" />
              </motion.div>
              <motion.div
                className="excavator-robot relative z-10 mx-auto aspect-square w-[min(82vw,590px)] origin-[56%_78%]"
                style={
                  motionEnabled
                    ? { rotate: robotRotate, x: robotX, y: robotY }
                    : undefined
                }
              >
                <Image
                  src="/media/brokk-400.webp"
                  alt="Демонтажный робот Brokk начинает копать"
                  fill
                  sizes="(max-width: 1024px) 86vw, 48vw"
                  className="object-contain drop-shadow-[0_32px_56px_rgba(0,0,0,0.42)]"
                />
              </motion.div>
              <div className="pointer-events-none absolute right-4 bottom-8 left-4 h-32 rounded-[100%] bg-black/20 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-brand text-ink relative overflow-hidden py-24 sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute top-[-18rem] left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-white/24 blur-3xl" />
        <div className="site-container relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <Badge className="bg-ink text-white">Преимущество</Badge>
            <h2 className="font-display mt-5 text-5xl leading-[0.9] font-black text-balance uppercase sm:text-6xl">
              Техника берёт опасную работу на себя
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-black/62">
              Дистанционно управляемые роботы дают высокую производительность
              там, где ручной труд медленнее и опаснее.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/48 px-5 py-3 text-sm font-black tracking-[0.12em] uppercase">
              <HardHat className="size-5" />
              Оператор вне зоны риска
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((item, index) => (
              <motion.div
                key={item.title}
                className="rounded-3xl bg-white/72 p-7 shadow-[0_20px_70px_rgba(32,32,32,0.1)] backdrop-blur"
                initial={motionEnabled ? { opacity: 0, y: 26 } : false}
                whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <item.icon className="text-brand-dark size-8" />
                <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-black/58">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
