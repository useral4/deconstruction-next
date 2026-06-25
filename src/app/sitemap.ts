import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
import { auditSeo, canonicalForPage, normalizeSlug } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const redirectSources = new Set(
    auditSeo.redirects
      .filter(({ from, to }) => {
        if (!from?.startsWith("/") || from.includes("(.*)")) return false;
        try {
          const target = new URL(to, siteConfig.url);
          return (
            target.pathname.replace(/\/+$/, "") !== from.replace(/\/+$/, "")
          );
        } catch {
          return false;
        }
      })
      .map(({ from }) => from.replace(/\/+$/, "") || "/"),
  );
  const entries = pages
    .filter((page) => {
      const pathname =
        `/${normalizeSlug(page.slug)}`.replace(/\/+$/, "") || "/";
      return !redirectSources.has(pathname);
    })
    .map((page) => ({
      url: canonicalForPage(page),
      lastModified: now,
      changeFrequency:
        page.category === "blog" || page.category === "news"
          ? ("monthly" as const)
          : ("weekly" as const),
      priority:
        page.category === "service" || page.category === "geo" ? 0.8 : 0.6,
    }));

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...Array.from(new Map(entries.map((entry) => [entry.url, entry])).values()),
  ];
}
