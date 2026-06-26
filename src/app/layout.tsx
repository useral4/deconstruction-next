import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { VideoWidget } from "@/components/video-widget";
import { YandexMetrika } from "@/components/yandex-metrika";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Демонтажные работы роботами Brokk | Deconstruction Group",
    template: "%s | Deconstruction Group",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.name,
    title: "Демонтажные работы роботами Brokk",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: "/media/project-indoor.webp", width: 1680, height: 945 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Демонтажные работы роботами Brokk",
    description: siteConfig.description,
    images: ["/media/project-indoor.webp"],
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#202020",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness"],
            name: siteConfig.legalName,
            url: siteConfig.url,
            logo: `${siteConfig.url}/media/logo.webp`,
            telephone: siteConfig.phone,
            email: siteConfig.email,
            areaServed: ["Санкт-Петербург", "Москва", "Россия"],
            sameAs: [siteConfig.social.vk, siteConfig.social.dzen],
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <VideoWidget />
        <YandexMetrika />
      </body>
    </html>
  );
}
