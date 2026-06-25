import audit from "../../_data/audit.json";
import { cases } from "@/content/cases";
import { pages, type PageMeta } from "@/content/pages";
import { services } from "@/content/services";
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

export function cleanText(value: string) {
  return value
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
        .filter((slug) => slug && !slug.endsWith(".html")),
    ),
  );
}

export function getRelatedContent(page: PageMeta) {
  if (page.category === "case") {
    return cases
      .filter((item) => item.id !== page.id)
      .slice(0, 3)
      .map((item) => ({
        title: item.title,
        description: item.description,
        href: `/nashi-proekty/${item.slug}`,
      }));
  }

  return services
    .filter((item) => item.id !== page.id)
    .slice(0, 3)
    .map((item) => ({
      title: item.title,
      description: item.description,
      href: `/${item.slug}`,
    }));
}

export const auditSeo = {
  redirects: audit.redirects301,
  robots: audit.robots,
  sitemapUrls: audit.sitemapUrls,
};
