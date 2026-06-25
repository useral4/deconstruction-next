import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cases } from "@/content/cases";
import { services } from "@/content/services";
import { LeadForm } from "@/components/forms/lead-form";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { cleanText } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const cardImages = [
  "/media/project-indoor.webp",
  "/media/project-city.webp",
  "/media/project-factory.webp",
  "/media/project-demolition.webp",
  "/media/service-cutting.webp",
  "/media/brokk-110.webp",
];

function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-ink relative overflow-hidden py-24 text-white sm:py-32">
      <div className="border-brand/10 absolute -top-32 -right-32 size-[500px] rounded-full border-[80px]" />
      <div className="site-container relative">
        <span className="text-brand text-xs font-black tracking-[.2em] uppercase">
          {eyebrow}
        </span>
        <h1 className="font-display mt-5 max-w-5xl text-5xl leading-[.9] font-black text-balance uppercase sm:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
          {description}
        </p>
      </div>
    </section>
  );
}

export function ServicesCatalog() {
  return (
    <>
      <PageHero
        eyebrow="104 направления"
        title="Услуги Deconstruction Group"
        description="Роботизированный демонтаж, алмазная резка, проходка, раскалывание, промышленная чистка и аренда техники."
      />
      <section className="section-space bg-[#f4f2ed]">
        <div className="site-container grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Link
              key={`${service.id}-${service.slug}`}
              href={`/${service.slug}`}
              className="group flex min-h-64 flex-col rounded-3xl bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="text-xs font-black tracking-[.15em] text-stone-400 uppercase">
                Услуга {String(index + 1).padStart(3, "0")}
              </span>
              <h2 className="text-ink mt-4 text-xl leading-tight font-black">
                {service.title}
              </h2>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-stone-500">
                {cleanText(service.description)}
              </p>
              <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-black uppercase">
                Подробнее
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function CasesCatalog() {
  return (
    <>
      <PageHero
        eyebrow="Портфолио"
        title="Наши проекты"
        description="Опыт демонтажа, реконструкции и специальных работ на инфраструктурных, промышленных и гражданских объектах."
      />
      <section className="section-space bg-[#f4f2ed]">
        <div className="site-container grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cases.map((item, index) => (
            <Link
              key={item.id}
              href={`/nashi-proekty/${item.slug}`}
              className="group overflow-hidden rounded-3xl bg-white"
            >
              <div className="relative h-64">
                <Image
                  src={cardImages[index % cardImages.length]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <h2 className="text-ink text-xl leading-tight font-black">
                  {item.title}
                </h2>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-stone-500">
                  {cleanText(item.description)}
                </p>
                <span className="mt-6 flex items-center gap-2 text-sm font-black uppercase">
                  Смотреть кейс <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Всегда на связи"
        description="Обсудим задачу, запросим исходные данные и организуем выезд специалиста на объект."
      />
      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Связаться" title="Расскажите об объекте" />
            <div className="mt-10 grid gap-5">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-4 rounded-2xl bg-[#f4f2ed] p-5"
              >
                <Phone className="text-brand-dark size-6" />
                <strong>{siteConfig.phone}</strong>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 rounded-2xl bg-[#f4f2ed] p-5"
              >
                <Mail className="text-brand-dark size-6" />
                <strong>{siteConfig.email}</strong>
              </a>
              <div className="flex items-center gap-4 rounded-2xl bg-[#f4f2ed] p-5">
                <MapPin className="text-brand-dark size-6" />
                <strong>Санкт-Петербург · Москва · Россия</strong>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-[#f4f2ed] p-7 sm:p-10">
            <h2 className="font-display text-3xl font-black uppercase">
              Написать нам
            </h2>
            <p className="mt-3 mb-7 text-stone-500">
              Отправьте контакты — инженер свяжется с вами.
            </p>
            <LeadForm type="contact" />
          </div>
        </div>
      </section>
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="О компании"
        title="Инженерный подход к демонтажу"
        description="Deconstruction Group специализируется на автоматизации сложных демонтажных процессов и применении дистанционно управляемой техники."
      />
      <section className="section-space bg-white">
        <div className="site-container grid items-center gap-14 lg:grid-cols-2">
          <div className="relative min-h-[520px] overflow-hidden rounded-3xl">
            <Image
              src="/media/project-indoor.webp"
              alt="Роботизированный демонтаж внутри здания"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Deconstruction Group"
              title="Технология вместо лишнего риска"
              description="Мы подбираем методику, технику и навесное оборудование под условия конкретного объекта."
            />
            <div className="mt-8 space-y-5 leading-8 text-stone-600">
              <p>
                Работаем с железобетоном, металлоконструкциями, промышленными
                объектами, зданиями и инфраструктурой. Для сложных задач
                используем роботов Brokk, гидроклинья и алмазную резку.
              </p>
              <p>
                Проектный подход помогает заранее оценить риски, организовать
                безопасную площадку и выдержать согласованные сроки.
              </p>
            </div>
            <ButtonLink href="/kontakty" className="mt-8">
              Обсудить проект
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

export function PricePage() {
  return (
    <>
      <PageHero
        eyebrow="Стоимость"
        title="Цена зависит от технологии и условий объекта"
        description="Подготовим расчёт после изучения конструкций, объёма, доступа на площадку и требуемых сроков."
      />
      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Что влияет"
              title="Прозрачный расчёт работ"
            />
            <ul className="mt-8 grid gap-3">
              {[
                "Материал и толщина конструкций",
                "Объём демонтажа",
                "Условия доступа и ограничения площадки",
                "Необходимая техника и навесное оборудование",
                "Вывоз и утилизация строительных отходов",
                "Сроки и режим работы объекта",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-black/10 px-5 py-4 font-bold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-brand rounded-3xl p-7 sm:p-10">
            <h2 className="font-display text-4xl font-black uppercase">
              Заказать расчёт
            </h2>
            <p className="mt-3 mb-7 max-w-xl text-black/60">
              Чем подробнее исходные данные, тем точнее предварительная смета.
            </p>
            <LeadForm type="estimate" buttonText="Получить расчёт" />
          </div>
        </div>
      </section>
    </>
  );
}

export function LegalPage({ kind }: { kind: "privacy" | "agreement" }) {
  const privacy = kind === "privacy";
  return (
    <>
      <PageHero
        eyebrow="Документы"
        title={
          privacy
            ? "Политика конфиденциальности"
            : "Пользовательское соглашение"
        }
        description="Условия использования сайта и обработки информации."
      />
      <article className="section-space bg-white">
        <div className="site-container max-w-4xl space-y-8 leading-8 text-stone-700">
          <h2 className="text-ink text-2xl font-black">Общие положения</h2>
          <p>
            Настоящий документ регулирует использование сайта deconstruction.ru.
            Пользователь предоставляет данные добровольно, когда отправляет
            форму обратной связи или обращается к компании.
          </p>
          <h2 className="text-ink text-2xl font-black">
            {privacy ? "Обработка данных" : "Использование сайта"}
          </h2>
          <p>
            Контактные данные используются для ответа на обращение, подготовки
            расчёта и связи по указанной пользователем задаче. Передача данных
            третьим лицам допускается только в случаях, предусмотренных законом
            или необходимых для исполнения обращения.
          </p>
          <h2 className="text-ink text-2xl font-black">Контакты</h2>
          <p>
            По вопросам документа можно обратиться по адресу{" "}
            <a
              className="font-bold underline"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </article>
    </>
  );
}
