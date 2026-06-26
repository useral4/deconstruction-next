import audit from "../../_data/audit.json";
import { cases } from "@/content/cases";
import { pages, type PageMeta } from "@/content/pages";
import { isHiddenServiceSlug, visibleServices } from "@/content/services";
import { siteConfig } from "@/lib/site";

type AuditPage = {
  file: string;
  pageId: string;
  alias: string | null;
  headings?: Record<string, string[]>;
  images?: string[];
  ctas?: Array<{ text: string; href: string }>;
};

const auditPages = audit.pages as AuditPage[];

export function normalizeSlug(value: string | string[] | null | undefined) {
  const source = Array.isArray(value) ? value.join("/") : value || "";
  if (/^https?:\/\//i.test(source)) {
    try {
      return new URL(source).pathname.replace(/^\/+|\/+$/g, "");
    } catch {
      return "";
    }
  }
  return decodeURIComponent(source).replace(/^\/+|\/+$/g, "");
}

export function sanitizePublicText(value: string) {
  return value
    .replace(
      /на предприятии\s+ГМК\s*["«]КАЗЦИНК["»]/gi,
      "на предприятии в Казахстане по производству цинка",
    )
    .replace(
      /на\s+ГМК\s*["«]КАЗЦИНК["»]/gi,
      "на предприятии по производству цинка",
    )
    .replace(
      /ГМК\s*["«]КАЗЦИНК["»]/gi,
      "предприятие в Казахстане по производству цинка",
    )
    .replace(/Deconstruction Group/gi, "Брокк демонтаж Северо-Запад")
    .replace(/Deconstruction group/gi, "Брокк демонтаж Северо-Запад")
    .replace(/Deconstruction/gi, "БДСЗ")
    .replace(/КАЗЦИНК/gi, "предприятие по производству цинка")
    .replace(/Кейс\s+["«]ПСБ ЖилСтрой["»]/gi, "Кейс подрядной организации")
    .replace(/с компанией\s+["«]Пилон["»]/gi, "с подрядной организацией")
    .replace(/компанией\s+["«]Пилон["»]/gi, "подрядной организацией")
    .replace(/компании\s+["«]Пилон["»]/gi, "подрядной организации")
    .replace(/с компанией\s+["«]ПСБ ЖилСтрой["»]/gi, "с подрядной организацией")
    .replace(/компанией\s+["«]ПСБ ЖилСтрой["»]/gi, "подрядной организацией")
    .replace(/компании\s+["«]ПСБ ЖилСтрой["»]/gi, "подрядной организации")
    .replace(/для компании\s+["«]ЭлисСтрой["»]/gi, "для строительной компании")
    .replace(/компанией\s+["«]ЭлисСтрой["»]/gi, "строительной компанией")
    .replace(/компании\s+["«]ЭлисСтрой["»]/gi, "строительной компании")
    .replace(/компани[ияю]\s+["«]Пилон["»]/gi, "подрядной организацией")
    .replace(/["«]Пилон["»]/gi, "подрядной организацией")
    .replace(/компани[ияю]\s+["«]ПСБ ЖилСтрой["»]/gi, "подрядной организацией")
    .replace(/["«]ПСБ ЖилСтрой["»]/gi, "подрядной организацией")
    .replace(/компани[ияю]\s+["«]ЭлисСтрой["»]/gi, "строительной компанией")
    .replace(/["«]ЭлисСтрой["»]/gi, "строительной компанией")
    .replace(
      /Карачаровского механического завода/gi,
      "машиностроительного предприятия",
    )
    .replace(
      /Карачаровском механическом заводе/gi,
      "машиностроительном предприятии",
    )
    .replace(
      /Светогорском ЦБК/gi,
      "предприятии целлюлозно-бумажной промышленности",
    )
    .replace(
      /Светогорский ЦБК/gi,
      "предприятие целлюлозно-бумажной промышленности",
    )
    .replace(/Нижне-Свирской ГЭС/gi, "гидроэлектростанции")
    .replace(/Лесогорской и Светогорской ГЭС/gi, "гидроэлектростанций")
    .replace(/Саяно-\s*Шушенской ГЭС/gi, "гидроэлектростанции")
    .replace(/ТРЦ\s+["«]Галерея["»]/gi, "торгово-развлекательном центре")
    .replace(/["«]Лахта центр["»]/gi, "многофункциональном комплексе")
    .replace(/["«]Зенит["»]\s+арен[аы]/gi, "стадиона в Санкт-Петербурге")
    .replace(/["«]Зенит["»]/gi, "стадиона")
    .replace(/стадион[ае]\s+["«]Спартак["»]/gi, "стадионе в Москве")
    .replace(/завод[еа]\s+["«]Цесла["»]/gi, "цементном предприятии")
    .replace(/ВЕЗЬДЕ/g, "ВЕЗДЕ")
    .replace(/везьде/g, "везде");
}

export function cleanText(value: string) {
  return sanitizePublicText(value)
    .replace(/[█▬▀]+/g, "")
    .replace(/\s*\|\s*/g, " · ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function canonicalForPage(page: PageMeta) {
  const slug = normalizeSlug(page.slug);
  return slug ? `${siteConfig.url}/${slug}` : siteConfig.url;
}

export function getPageBySlug(slug: string | string[]) {
  const normalized = normalizeSlug(slug);
  if (isHiddenServiceSlug(normalized)) return undefined;
  return pages.find((page) => normalizeSlug(page.slug) === normalized);
}

export function getAuditPage(page: PageMeta) {
  return auditPages.find(
    (item) => item.pageId === page.id || item.file === page.file,
  );
}

export function getAllPageSlugs() {
  return Array.from(
    new Set(
      pages
        .map((page) => normalizeSlug(page.slug))
        .filter(
          (slug) =>
            slug && !slug.endsWith(".html") && !isHiddenServiceSlug(slug),
        ),
    ),
  );
}

export function getRelatedContent(page: PageMeta) {
  if (page.category === "case") {
    return cases
      .filter((item) => item.id !== page.id)
      .slice(0, 3)
      .map((item) => ({
        title: cleanText(item.title),
        description: cleanText(item.description),
        href: `/nashi-proekty/${item.slug}`,
      }));
  }

  return visibleServices
    .filter((item) => item.id !== page.id)
    .slice(0, 3)
    .map((item) => ({
      title: cleanText(item.title),
      description: cleanText(item.description),
      href: `/${item.slug}`,
    }));
}

export const auditSeo = {
  redirects: audit.redirects301,
  robots: audit.robots,
  sitemapUrls: audit.sitemapUrls,
};
