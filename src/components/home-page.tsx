import { ArrowRight, Award, Check, Clock3, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cases } from "@/content/cases";
import { faq } from "@/content/faq";
import { ExcavatorScrollScene } from "@/components/excavator-scroll-scene";
import { LeadForm } from "@/components/forms/lead-form";
import { CalculatorForm } from "@/components/forms/calculator-form";
import { SectionHeading } from "@/components/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

const serviceGroups = [
  {
    title: "Демонтаж",
    href: "/uslugi/demontazh",
    items: ["Здания и сооружения", "Бетон и ЖБ", "Фундаменты"],
    image: "/media/service-brokk.webp",
  },
  {
    title: "Алмазная резка",
    href: "/uslugi/pilenie",
    items: ["Канатная резка", "Дисковая резка", "Совместно с роботами"],
    image: "/media/service-cutting.webp",
  },
  {
    title: "Проходка",
    href: "/uslugi/prohodka",
    items: ["Тоннели и метро", "Очистные сооружения", "Профилирование"],
    image: "/media/project-factory.webp",
  },
  {
    title: "Раскалывание",
    href: "/uslugi/raskalyvanie",
    items: ["Гидроклинья", "Камень и скальные породы", "Железобетон"],
    image: "/media/project-demolition.webp",
  },
  {
    title: "Промышленная чистка",
    href: "/uslugi/chistka",
    items: ["Печи", "Ковши", "Цементное производство"],
    image: "/media/project-indoor.webp",
  },
  {
    title: "Аренда Brokk",
    href: "/arenda-demontazhnykh-robotov",
    items: ["Техника с оператором", "Навесное оборудование", "Доставка"],
    image: "/media/brokk-110.webp",
  },
];

const process = [
  "Получаем заявку и изучаем задачу",
  "Выезжаем на объект и предлагаем решения",
  "Готовим смету, проект и договор",
  "Выполняем работы в согласованные сроки",
  "Сдаём результат и закрывающие документы",
];

const projectImages = [
  "/media/project-indoor.webp",
  "/media/project-city.webp",
  "/media/project-factory.webp",
  "/media/project-demolition.webp",
];

export function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[760px] overflow-hidden bg-[#f4f2ed]">
        <div className="bg-brand absolute inset-y-0 right-0 -z-10 w-[38%] lg:w-[43%]" />
        <div className="absolute top-16 -right-20 -z-10 hidden size-[680px] rounded-full border border-black/10 lg:block" />
        <Image
          src="/media/hero-robot.webp"
          alt="Демонтажный робот Brokk"
          width={1024}
          height={1023}
          priority
          sizes="(max-width: 1024px) 80vw, 48vw"
          className="pointer-events-none absolute -right-8 -bottom-8 -z-10 aspect-square h-auto w-[48vw] max-w-[760px] sm:-right-12 sm:w-[60vw] lg:right-[-2%] lg:w-[48vw]"
        />
        <div className="site-container flex min-h-[760px] items-start py-20 sm:py-28">
          <div className="max-w-3xl">
            <Badge>20+ лет в демонтаже</Badge>
            <h1 className="font-display text-ink mt-6 text-[clamp(3.2rem,7.6vw,7.2rem)] leading-[.82] font-black tracking-[-.04em] text-balance uppercase">
              Демонтаж
              <span className="text-brand text-stroke block">без лишнего</span>
              риска
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-stone-700 sm:text-xl">
              Разборка, снос и реконструкция роботами Brokk. Работаем в
              Санкт-Петербурге, Москве и по всей России.
            </p>
            <ul className="mt-7 grid max-w-xl gap-3 text-sm font-bold sm:grid-cols-2">
              {[
                "Бесплатный выезд инженера",
                "Собственный парк техники",
                "Проект и смета под ключ",
                "Работа на сложных объектах",
              ].map((item) => (
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

      <section className="bg-ink text-white">
        <div className="site-container grid divide-y divide-white/10 py-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {[
            ["20+", "лет практического опыта"],
            ["40", "кейсов в базе проекта"],
            ["104", "направления работ"],
            ["24 ч", "на первичную оценку"],
          ].map(([value, label]) => (
            <div key={label} className="px-6 py-7 first:pl-0">
              <strong className="font-display text-brand text-4xl font-black">
                {value}
              </strong>
              <span className="mt-1 block text-sm text-white/50">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading
            eyebrow="Услуги"
            title="Один подрядчик для сложного демонтажа"
            description="Подбираем технологию под конструкцию, ограничения площадки, сроки и требования безопасности."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {serviceGroups.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.04}>
                <Link
                  href={service.href}
                  className="group bg-ink relative block min-h-[410px] overflow-hidden rounded-3xl text-white"
                >
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <span className="text-brand text-xs font-black tracking-[.18em]">
                      0{index + 1}
                    </span>
                    <h3 className="font-display mt-2 text-4xl leading-none font-black uppercase">
                      {service.title}
                    </h3>
                    <ul className="mt-5 space-y-2 text-sm text-white/70">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Check className="text-brand size-4" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="text-brand mt-6 flex items-center gap-2 text-sm font-black uppercase">
                      Подробнее <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ExcavatorScrollScene />

      <section className="section-space bg-[#f4f2ed]">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Проекты"
              title="Задачи, которые уже решены"
              description="Реконструкция мостов, работа на промышленных объектах, демонтаж бетона и аварийных конструкций."
            />
            <ButtonLink href="/nashi-proekty" variant="dark">
              Все проекты <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {cases.slice(0, 4).map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05}>
                <Link
                  href={`/nashi-proekty/${item.slug}`}
                  className="group grid overflow-hidden rounded-3xl bg-white sm:grid-cols-[.9fr_1.1fr]"
                >
                  <div className="relative min-h-64">
                    <Image
                      src={projectImages[index]}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col p-7">
                    <span className="text-xs font-black tracking-[.15em] text-stone-600 uppercase">
                      Проект {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-ink mt-3 text-xl leading-tight font-black">
                      {item.title}
                    </h3>
                    <p className="mt-4 line-clamp-4 text-sm leading-6 text-stone-500">
                      {item.description}
                    </p>
                    <span className="text-ink mt-auto flex items-center gap-2 pt-6 text-sm font-black uppercase">
                      Смотреть кейс
                      <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading
            eyebrow="Процесс"
            title="Пять шагов до готового результата"
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-black/10 md:grid-cols-5">
            {process.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <div className="h-full bg-white p-7">
                  <span className="font-display text-brand-dark text-5xl font-black">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-ink mt-12 leading-6 font-bold">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="section-space bg-brand">
        <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <Badge className="bg-ink text-white">Расчёт проекта</Badge>
            <h2 className="font-display text-ink mt-5 text-5xl leading-[.9] font-black uppercase sm:text-6xl">
              Узнайте стоимость демонтажа
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-black/65">
              Заполните короткую форму. Мы уточним детали, подберём технику и
              подготовим предварительный расчёт.
            </p>
            <div className="mt-8 flex flex-wrap gap-5 text-sm font-bold">
              <span className="flex items-center gap-2">
                <Clock3 className="size-5" /> Быстрый ответ
              </span>
              <span className="flex items-center gap-2">
                <Award className="size-5" /> Несколько решений
              </span>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-9">
            <CalculatorForm />
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Отвечаем на частые вопросы"
            description="Если вашего вопроса здесь нет, оставьте заявку — инженер разберёт задачу предметно."
          />
          <Accordion
            items={faq.map((item) => ({
              title: item.question,
              content: item.answer,
            }))}
          />
        </div>
      </section>

      <section id="contact" className="section-space bg-[#f4f2ed]">
        <div className="site-container bg-ink grid overflow-hidden rounded-[2rem] lg:grid-cols-[.85fr_1.15fr]">
          <div className="relative min-h-[420px] p-8 text-white sm:p-12">
            <Image
              src="/media/project-city.webp"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover opacity-25"
            />
            <div className="relative">
              <Badge>Связаться</Badge>
              <h2 className="font-display mt-6 text-5xl leading-[.9] font-black uppercase">
                Обсудим ваш объект
              </h2>
              <a
                href={siteConfig.phoneHref}
                className="text-brand mt-10 block text-3xl font-black"
              >
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 block text-white/65"
              >
                {siteConfig.email}
              </a>
              <p className="mt-8 max-w-sm leading-7 text-white/55">
                Санкт-Петербург, Москва и выездные проекты по всей России.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 sm:p-12">
            <h3 className="font-display text-ink text-3xl font-black uppercase">
              Заказать демонтаж
            </h3>
            <p className="mt-3 mb-7 text-stone-500">
              Оставьте контакты и краткое описание задачи.
            </p>
            <LeadForm type="demolition" buttonText="Отправить инженеру" />
          </div>
        </div>
      </section>
    </>
  );
}
