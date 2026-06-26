import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
import { canonicalForPage } from "@/lib/content";
import { isHiddenServiceSlug } from "@/content/services";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticSections: MetadataRoute.Sitemap = [
    "uslugi",
    "nashi-proekty",
    "demontazhnyy-blog",
    "novosti",
    "arenda-demontazhnykh-robotov",
    "gorod",
    "price",
    "o-kompanii",
    "kontakty",
    "politika-konfidencialnosti",
    "polzovatelskoe-soglashenie",
  ].map((slug) => ({
    url: `${siteConfig.url}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: slug === "uslugi" ? 0.9 : 0.7,
  }));
  const entries = pages
    .filter((page) => !isHiddenServiceSlug(page.slug))
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
    ...staticSections,
    ...Array.from(new Map(entries.map((entry) => [entry.url, entry])).values()),
  ];
}
