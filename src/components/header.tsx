"use client";

import { Calculator, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CalculatorModal } from "@/components/calculator-modal";
import { Button } from "@/components/ui/button";
import { mainNavigation, siteConfig } from "@/lib/site";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  return (
    <>
      <header className="bg-ink/95 sticky top-0 z-50 border-b border-white/10 text-white backdrop-blur-xl">
        <div className="site-container flex h-20 items-center gap-5">
          <Link href="/" className="relative block h-12 w-36 shrink-0">
            <Image
              src="/media/logo.webp"
              alt="Deconstruction Group"
              fill
              priority
              sizes="144px"
              className="object-contain object-left"
            />
          </Link>
          <nav className="ml-auto hidden items-center gap-1 lg:flex xl:gap-2">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-brand rounded-full px-3 py-3 text-sm leading-none font-black tracking-[.08em] uppercase transition hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={siteConfig.phoneHref}
            onClick={() => {
              if (window.ym) window.ym(85251700, "reachGoal", "phone_click");
            }}
            className="ml-auto hidden items-center gap-2 px-2 py-3 text-base font-black sm:flex lg:ml-0"
          >
            <Phone className="text-brand size-4" />
            {siteConfig.phone}
          </a>
          <div className="hidden xl:block">
            <Button size="sm" onClick={() => setCalculatorOpen(true)}>
              <Calculator className="size-4" />
              Калькулятор
            </Button>
          </div>
          <button
            className="ml-auto grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="bg-ink border-t border-white/10 px-5 py-6 lg:hidden">
            <nav className="mx-auto grid max-w-7xl gap-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-brand rounded-xl px-4 py-3 text-lg font-black uppercase hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={siteConfig.phoneHref}
                className="text-brand mt-3 flex items-center gap-2 px-4 py-3 font-black"
              >
                <Phone className="size-5" />
                {siteConfig.phone}
              </a>
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  setCalculatorOpen(true);
                }}
                className="mt-3"
              >
                Калькулятор
              </Button>
            </nav>
          </div>
        )}
      </header>
      <button
        onClick={() => setCalculatorOpen(true)}
        className="bg-brand text-ink fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full shadow-xl transition hover:scale-105 xl:hidden"
        aria-label="Открыть калькулятор"
      >
        <Calculator />
      </button>
      <CalculatorModal
        open={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
      />
    </>
  );
}
