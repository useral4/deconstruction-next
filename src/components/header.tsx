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
        <div className="header-container grid h-20 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
          <Link
            href="/"
            className="block h-14 w-32 shrink-0 rounded-md bg-white p-1.5 shadow-sm ring-1 ring-white/20 2xl:w-40"
          >
            <span className="relative block size-full">
              <Image
                src="/media/logo.webp"
                alt={siteConfig.name}
                fill
                priority
                sizes="160px"
                className="object-contain object-left"
              />
            </span>
          </Link>
          <nav className="hidden min-w-0 items-center justify-center gap-0.5 overflow-hidden xl:flex 2xl:gap-1">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-brand shrink-0 rounded-full px-1.5 py-3 text-[11px] leading-none font-black tracking-[.04em] whitespace-nowrap uppercase transition hover:bg-white/5 2xl:px-2.5 2xl:text-[13px]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex min-w-0 items-center gap-3">
            <a
              href={siteConfig.phoneHref}
              onClick={() => {
                if (window.ym) window.ym(85251700, "reachGoal", "phone_click");
              }}
              className="hidden shrink-0 items-center gap-2 px-1 py-3 text-sm font-black whitespace-nowrap min-[1700px]:flex 2xl:text-[15px]"
            >
              <Phone className="text-brand size-4 shrink-0" />
              {siteConfig.phone}
            </a>
            <div className="hidden shrink-0 xl:block">
              <Button size="sm" onClick={() => setCalculatorOpen(true)}>
                <Calculator className="size-4" />
                Калькулятор
              </Button>
            </div>
            <button
              className="grid size-11 place-items-center rounded-full border border-white/15 xl:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="bg-ink border-t border-white/10 px-5 py-6 xl:hidden">
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
