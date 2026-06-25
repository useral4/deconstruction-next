# Статус миграции

Дата проверки: 2026-06-25.

## Реализовано

- Next.js 15, App Router, TypeScript, ESLint, Tailwind CSS 4.
- Абсолютные импорты, Prettier, Husky, lint-staged и `.env.example`.
- UI-kit: Button, Input, Textarea, Select, Checkbox, Modal, Badge, Spinner,
  Accordion и Tabs.
- Новая адаптивная главная в фирменном стиле Deconstruction Group.
- Каталоги 104 услуг и 40 проектов.
- Статические страницы компании, контактов, цен и юридических документов.
- 349 маршрутов из экспорта Tilda генерируются через App Router.
- Исходные title, description, H1 и URL перенесены из аудита.
- Canonical, OpenGraph, Twitter Cards, robots и sitemap.
- JSON-LD: Organization, LocalBusiness, Service, FAQPage, BreadcrumbList,
  Review.
- Карта постоянных редиректов подключена из `_data/audit.json`.
- React Hook Form, Zod и Server Actions для заявок.
- Адаптеры Telegram и Resend через переменные окружения.
- Цели Яндекс.Метрики и SPA-трекинг.
- Изображения главной оптимизированы в WebP и подключены через `next/image`.
- Проверены ширины 320, 375, 768, 1024, 1440 и 1920 px.
- Все 347 URL итогового sitemap отвечают HTTP 200.
- Production-сборка генерирует 355 страниц без ошибок.
- Lighthouse:
  - Mobile: Performance 90, Accessibility 100, Best Practices 100, SEO 100.
  - Desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100.

## Требуются внешние доступы

Эти задачи нельзя завершить только из архива:

- заполнить токены Telegram и Resend в production `.env`;
- проверить реальную доставку заявок в рабочие каналы;
- получить SSH-доступ к Ubuntu-серверу;
- настроить PM2, Nginx, SSL, DNS и переключение домена;
- проверить рабочую Яндекс.Метрику после переключения домена;
- отправить sitemap в Яндекс.Вебмастер и Google Search Console;
- отслеживать позиции и органический трафик после релиза;
- проверить Safari на реальном устройстве/macOS.

## Команды production

```bash
npm ci
npm run build
npm run start
```

Локальная проверенная версия запущена на `http://127.0.0.1:4173`.
