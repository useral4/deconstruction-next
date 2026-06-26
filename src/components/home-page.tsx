import {
  ArrowRight,
  Award,
  Check,
  Clock3,
  Gauge,
  HardHat,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cases } from "@/content/cases";
import { faq } from "@/content/faq";
import { LeadForm } from "@/components/forms/lead-form";
import { CalculatorForm } from "@/components/forms/calculator-form";
import { HeroExcavator } from "@/components/hero-excavator";
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

const benefits = [
  {
    icon: Gauge,
    title: "До 4× быстрее",
    text: "Робот выполняет большой объём работ за смену и сокращает общий срок проекта.",
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

const methodHighlights = [
  {
    title: "Различные методики сноса",
    text: "Комплексный подход к задаче с применением различных методов демонтажа.",
  },
  {
    title: "Техника и оборудование всегда готово к работе",
    text: "Постоянное пополнение склада запасных частей для обслуживания и ремонта техники, оборудования.",
  },
  {
    title: "Разнообразный парк техники и оборудования",
    text: "Демонтажные роботы BROKK, гидроклинья TEHMA и DARDA, алмазный инструмент CEDIMA и HILTI.",
  },
  {
    title: "Несколько решений для каждого клиента",
    text: "К каждому клиенту подходим индивидуально и предлагаем несколько технических решений.",
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
      <HeroExcavator />

      <section className="bg-ink text-white">
        <div className="site-container grid divide-y divide-white/10 py-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {[
            ["20+", "лет практического опыта"],
            ["40", "кейсов в базе проекта"],
            ["104", "направления работ"],
            ["24 ч", "на первичную оценку"],
          ].map(([value, label]) => (
            <div key={label} className="px-6 py-7 lg:first:pl-0">
              <strong className="font-display text-brand text-4xl font-black">
                {value}
              </strong>
              <span className="mt-1 block text-sm text-white/50">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand text-ink overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="site-container">
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-2">
            {methodHighlights.map((item) => (
              <div key={item.title} className="grid gap-5 sm:grid-cols-[76px_1fr]">
                <span className="mt-3 hidden h-px bg-black sm:block" />
                <div>
                  <h2 className="text-xl leading-tight font-black tracking-[.03em] uppercase sm:text-2xl">
                    {item.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-black/80">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 grid items-end gap-12 lg:grid-cols-[1.25fr_.9fr]">
            <div className="relative min-h-[260px]">
              <p className="text-xl leading-none">Деконстракшн групп</p>
              <div className="font-display relative z-10 mt-8 text-[clamp(4rem,9vw,9rem)] leading-[.78] font-black tracking-[-.03em]">
                <span className="block">Мы состоим</span>
                <span className="ml-[34%] block text-white">НАДО*</span>
              </div>
              <div className="pointer-events-none absolute right-[8%] bottom-0 hidden aspect-square w-[min(46vw,360px)] rounded-full border border-white/75 lg:block" />
              <span className="absolute top-7 left-0 size-2 bg-white" />
              <span className="absolute top-10 right-[28%] hidden text-7xl leading-none font-black text-white lg:block">
                В
              </span>
            </div>

            <div>
              <div className="relative aspect-[2.7] w-full max-w-[420px] bg-black">
                <Image
                  src="/media/nado-logo.webp"
                  alt="Логотип НАДО"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-contain"
                />
              </div>
              <p className="mt-8 max-w-md text-xl leading-8">
                * Член национальной Ассоциации Демонтажных организаций
              </p>
              <Link
                href="/o-kompanii"
                className="mt-8 inline-flex items-center gap-2 text-lg font-black"
              >
                Подробнее <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
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

      <section className="section-space bg-ink overflow-hidden text-white">
        <div className="site-container grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div className="bg-brand relative min-h-[530px] rounded-3xl">
            <Image
              src="/media/brokk-400.webp"
              alt="Робот Brokk 400"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain p-8 drop-shadow-2xl"
            />
            <div className="text-ink absolute -right-5 -bottom-6 rounded-2xl bg-white p-5 shadow-xl">
              <HardHat className="text-brand-dark size-7" />
              <strong className="mt-2 block text-xl">
                Оператор вне зоны риска
              </strong>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Преимущество"
              title="Техника, которая берёт опасную работу на себя"
              description="Дистанционно управляемые роботы дают высокую производительность там, где ручной труд медленнее и опаснее."
              light
            />
            <div className="mt-10 grid gap-7 sm:grid-cols-2">
              {benefits.map((item) => (
                <div key={item.title}>
                  <item.icon className="text-brand size-7" />
                  <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                  <p className="mt-2 leading-7 text-white/55">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
