import { ArrowRight, Check, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PageMeta } from "@/content/pages";
import { LeadForm } from "@/components/forms/lead-form";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import {
  canonicalForPage,
  cleanText,
  getAuditPage,
  getRelatedContent,
  normalizeSlug,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

const categoryNames: Record<string, string> = {
  service: "Услуга",
  case: "Проект",
  blog: "Блог",
  news: "Новости",
  geo: "Работаем в вашем городе",
  rental: "Аренда техники",
  static: "Информация",
  other: "Deconstruction Group",
};

const categoryImages: Record<string, string> = {
  case: "/media/project-indoor.webp",
  blog: "/media/project-city.webp",
  news: "/media/project-factory.webp",
  geo: "/media/project-demolition.webp",
  rental: "/media/brokk-110.webp",
  service: "/media/service-brokk.webp",
  other: "/media/service-cutting.webp",
  static: "/media/project-city.webp",
};

function breadcrumbs(page: PageMeta) {
  const parts = normalizeSlug(page.slug).split("/").filter(Boolean);
  return parts.map((part, index) => ({
    label:
      index === parts.length - 1
        ? page.h1 || page.title
        : part.replaceAll("-", " "),
    href: `/${parts.slice(0, index + 1).join("/")}`,
  }));
}

export function ContentPage({ page }: { page: PageMeta }) {
  const details = getAuditPage(page);
  const related = getRelatedContent(page);
  const crumbs = breadcrumbs(page);
  const headings = Object.values(details?.headings || {})
    .flat()
    .filter((heading) => heading && heading !== page.h1)
    .slice(0, 6);
  const category = categoryNames[page.category] || categoryNames.other;
  const image = categoryImages[page.category] || categoryImages.other;
  const description = cleanText(page.description);
  const canonical = canonicalForPage(page);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Главная",
              item: siteConfig.url,
            },
            ...crumbs.map((crumb, index) => ({
              "@type": "ListItem",
              position: index + 2,
              name: crumb.label,
              item: `${siteConfig.url}${crumb.href}`,
            })),
          ],
        }}
      />
      {(page.category === "service" ||
        page.category === "geo" ||
        page.category === "rental") && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: page.h1 || page.title,
            description,
            url: canonical,
            provider: {
              "@type": "Organization",
              name: siteConfig.legalName,
              url: siteConfig.url,
            },
            areaServed: "Россия",
          }}
        />
      )}

      <section className="bg-ink relative isolate overflow-hidden py-20 text-white sm:py-28">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover opacity-25"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-black/20" />
        <div className="site-container">
          <nav
            className="mb-10 flex flex-wrap items-center gap-2 text-xs text-white/45"
            aria-label="Хлебные крошки"
          >
            <Link href="/">Главная</Link>
            {crumbs.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-2">
                <ChevronRight className="size-3" />
                <Link href={crumb.href} className="capitalize">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
          <span className="text-brand text-xs font-black tracking-[.2em] uppercase">
            {category}
          </span>
          <h1 className="font-display mt-5 max-w-5xl text-5xl leading-[.9] font-black text-balance uppercase sm:text-7xl">
            {page.h1 || page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            {description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#request" size="lg">
              Получить расчёт
            </ButtonLink>
            <ButtonLink href={siteConfig.phoneHref} variant="outline" size="lg">
              {siteConfig.phone}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container grid gap-14 lg:grid-cols-[1.2fr_.8fr]">
          <article>
            <p className="text-xl leading-9 text-stone-700">{description}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Выезд специалиста и осмотр объекта",
                "Подбор технологии и техники",
                "Смета и согласование работ",
                "Соблюдение требований безопасности",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-[#f4f2ed] p-5 font-bold"
                >
                  <span className="bg-brand grid size-6 shrink-0 place-items-center rounded-md">
                    <Check className="size-4" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
            {headings.length > 0 && (
              <div className="mt-14 space-y-12">
                {headings.map((heading) => (
                  <section key={heading}>
                    <h2 className="font-display text-ink text-3xl leading-tight font-black uppercase sm:text-4xl">
                      {heading}
                    </h2>
                    <p className="mt-4 leading-8 text-stone-600">
                      Для этой задачи команда оценивает конструкцию, доступ на
                      площадку, требуемую производительность и возможные
                      ограничения. После осмотра предлагаем технически
                      обоснованный вариант выполнения работ.
                    </p>
                  </section>
                ))}
              </div>
            )}
          </article>
          <aside
            id="request"
            className="bg-brand h-fit rounded-3xl p-7 lg:sticky lg:top-28"
          >
            <h2 className="font-display text-3xl font-black uppercase">
              Обсудить задачу
            </h2>
            <p className="mt-3 mb-6 leading-7 text-black/60">
              Оставьте контакты. Инженер уточнит детали и подготовит
              предварительный расчёт.
            </p>
            <LeadForm type="estimate" compact buttonText="Перезвоните мне" />
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-space bg-[#f4f2ed]">
          <div className="site-container">
            <h2 className="font-display text-4xl font-black uppercase">
              Смотрите также
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-64 flex-col rounded-3xl bg-white p-7"
                >
                  <h3 className="text-xl leading-tight font-black">
                    {item.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-stone-500">
                    {item.description}
                  </p>
                  <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-black uppercase">
                    Подробнее
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
