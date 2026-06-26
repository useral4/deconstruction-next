import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

type AuditRedirect = { from: string; to: string };

function migratedRedirects() {
  const auditPath = path.join(process.cwd(), "_data", "audit.json");
  const audit = JSON.parse(fs.readFileSync(auditPath, "utf8")) as {
    redirects301: AuditRedirect[];
  };
  const seen = new Set<string>();

  return audit.redirects301.flatMap(({ from, to }) => {
    if (!from?.startsWith("/") || from.includes("(.*)")) return [];

    let destination = to;
    try {
      const url = new URL(to, "https://deconstruction.ru");
      destination =
        url.hostname === "deconstruction.ru"
          ? `${url.pathname}${url.search}${url.hash}`
          : url.toString();
    } catch {
      return [];
    }

    const source = from.replace(/\/+$/, "") || "/";
    const normalizedDestination = destination.startsWith("/")
      ? destination.replace(/\/+$/, "") || "/"
      : destination;

    if (source === normalizedDestination || seen.has(source)) return [];
    seen.add(source);

    return [{ source, destination, permanent: true }];
  });
}

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return migratedRedirects();
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
