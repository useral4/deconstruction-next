import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-ink grid min-h-[70vh] place-items-center px-5 py-24 text-center text-white">
      <div>
        <span className="font-display text-brand text-[10rem] leading-none font-black">
          404
        </span>
        <h1 className="font-display text-4xl font-black uppercase">
          Страница не найдена
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-white/55">
          Возможно, адрес изменился. Вернитесь на главную или откройте каталог
          услуг.
        </p>
        <ButtonLink href="/" className="mt-8">
          <ArrowLeft className="size-4" />
          На главную
        </ButtonLink>
      </div>
    </section>
  );
}
