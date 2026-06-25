import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AboutPage,
  CasesCatalog,
  ContactsPage,
  LegalPage,
  PricePage,
  ServicesCatalog,
} from "@/components/catalog-page";
import { ContentPage } from "@/components/content-page";
import {
  canonicalForPage,
  getAllPageSlugs,
  getPageBySlug,
  normalizeSlug,
} from "@/lib/content";

type Props = { params: Promise<{ slug: string[] }> };

const specialMetadata: Record<string, { title: string; description: string }> =
  {
    uslugi: {
      title: "Услуги демонтажа",
      description:
        "Все направления демонтажа, резки, проходки, промышленной чистки и аренды роботов Brokk.",
    },
    "nashi-proekty": {
      title: "Наши проекты",
      description: "Реализованные проекты Deconstruction Group.",
    },
    kontakty: {
      title: "Контакты",
      description: "Телефоны, email и форма связи Deconstruction Group.",
    },
    "o-kompanii": {
      title: "О компании",
      description: "Опыт, технологии и подход Deconstruction Group.",
    },
    price: {
      title: "Цены на демонтажные работы",
      description: "Факторы стоимости и заявка на расчёт демонтажа.",
    },
    "politika-konfidencialnosti": {
      title: "Политика конфиденциальности",
      description: "Политика обработки персональных данных.",
    },
    "polzovatelskoe-soglashenie": {
      title: "Пользовательское соглашение",
      description: "Условия использования сайта.",
    },
  };

export function generateStaticParams() {
  const specials = Object.keys(specialMetadata);
  return Array.from(new Set([...getAllPageSlugs(), ...specials])).map(
    (slug) => ({ slug: slug.split("/") }),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const normalized = normalizeSlug(slug);
  const special = specialMetadata[normalized];
  if (special) {
    return {
      title: special.title,
      description: special.description,
      alternates: { canonical: `/${normalized}` },
      openGraph: {
        title: special.title,
        description: special.description,
        url: `/${normalized}`,
      },
    };
  }

  const page = getPageBySlug(slug);
  if (!page) return {};
  const canonical = canonicalForPage(page);

  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical },
    openGraph: {
      type: page.category === "blog" ? "article" : "website",
      title: page.title,
      description: page.description,
      url: canonical,
      images: ["/media/project-indoor.webp"],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/media/project-indoor.webp"],
    },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const normalized = normalizeSlug(slug);

  if (normalized === "uslugi") return <ServicesCatalog />;
  if (normalized === "nashi-proekty") return <CasesCatalog />;
  if (normalized === "kontakty") return <ContactsPage />;
  if (normalized === "o-kompanii") return <AboutPage />;
  if (normalized === "price") return <PricePage />;
  if (normalized === "politika-konfidencialnosti") {
    return <LegalPage kind="privacy" />;
  }
  if (normalized === "polzovatelskoe-soglashenie") {
    return <LegalPage kind="agreement" />;
  }

  const page = getPageBySlug(slug);
  if (!page) notFound();
  return <ContentPage page={page} />;
}
