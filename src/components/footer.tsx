import Image from "next/image";
import Link from "next/link";
import { mainNavigation, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink py-14 text-white">
      <div className="site-container grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <div className="inline-flex h-[148px] w-56 rounded-md bg-white p-3 shadow-sm ring-1 ring-white/20">
            <div className="relative size-full">
              <Image
                src="/media/logo.webp"
                alt={siteConfig.name}
                fill
                sizes="224px"
                className="object-contain object-left"
              />
            </div>
          </div>
          <p className="mt-5 max-w-md leading-7 text-white/55">
            Роботизированный демонтаж, реконструкция и специальные работы на
            промышленных и гражданских объектах по всей России.
          </p>
        </div>
        <div>
          <h2 className="text-brand text-sm font-black tracking-[.16em] uppercase">
            Разделы
          </h2>
          <nav className="mt-5 grid gap-3">
            {mainNavigation.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="text-white/65 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2 className="text-brand text-sm font-black tracking-[.16em] uppercase">
            Связаться
          </h2>
          <div className="mt-5 grid gap-3">
            <a href={siteConfig.phoneHref} className="text-xl font-black">
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="text-white/65">
              {siteConfig.email}
            </a>
            <span className="text-white/60">
              Санкт-Петербург · Москва · Россия
            </span>
          </div>
        </div>
      </div>
      <div className="site-container mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} {siteConfig.legalName}
        </span>
        <div className="flex gap-5">
          <Link href="/politika-konfidencialnosti">Конфиденциальность</Link>
          <Link href="/polzovatelskoe-soglashenie">Соглашение</Link>
        </div>
      </div>
    </footer>
  );
}
