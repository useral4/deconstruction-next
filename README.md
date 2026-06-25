# Deconstruction Group — Next.js

Миграция `deconstruction.ru` с Tilda на Next.js 15.

## Запуск

```bash
npm ci
copy .env.example .env.local
npm run dev
```

Сайт откроется на `http://localhost:3000`.

## Production

```bash
npm run build
npm run start
```

## Контент

- `src/content/pages.ts` — URL и SEO-метаданные 350 страниц.
- `src/content/services.ts` — каталог услуг.
- `src/content/cases.ts` — проекты.
- `src/content/faq.ts` — вопросы и ответы.
- `_data/audit.json` — аудит Tilda, редиректы и исходная SEO-карта.

## Формы

Локально формы работают в демонстрационном режиме. Для реальной доставки
заявок заполните Telegram и/или Resend-переменные из `.env.example`.

## SEO

- Все известные URL генерируются через App Router.
- Metadata, canonical, OpenGraph и Twitter Cards формируются для каждой страницы.
- `robots.txt` и `sitemap.xml` генерируются Next.js.
- Редиректы перенесены из `_data/audit.json`.
- Добавлена JSON-LD-разметка Organization, LocalBusiness, Service, FAQPage,
  BreadcrumbList и Review.
