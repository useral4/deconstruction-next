"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-[#f4f2ed] px-5 text-center">
      <div>
        <span className="font-display text-brand-dark text-8xl font-black">
          Упс
        </span>
        <h1 className="font-display mt-3 text-4xl font-black uppercase">
          Не удалось открыть страницу
        </h1>
        <p className="mt-4 text-stone-500">Попробуйте загрузить её ещё раз.</p>
        <Button onClick={reset} className="mt-8">
          Повторить
        </Button>
      </div>
    </section>
  );
}
