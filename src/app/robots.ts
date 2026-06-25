import type { MetadataRoute } from "next";
import { auditSeo } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: auditSeo.robots.disallow,
    },
    sitemap: [`${siteConfig.url}/sitemap.xml`],
    host: siteConfig.url,
  };
}
