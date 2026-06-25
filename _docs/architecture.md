# Архитектура Next.js-версии

## Маршрутизация

Главная страница реализована в `src/app/page.tsx`. Все URL из экспорта Tilda
собираются статически через `src/app/[...slug]/page.tsx` и данные
`src/content/pages.ts`.

Каталоги услуг, проектов, контакты, страница компании, цены и юридические
страницы используют отдельные шаблоны. Остальные URL получают единый
контентный шаблон с исходными title, description, H1, canonical и хлебными
крошками.

## Контент

Контент отделён от компонентов:

- `src/content` — типизированные данные;
- `_data/audit.json` — полный результат аудита Tilda;
- `public/media` — оптимизированные WebP-изображения.

## Формы и интеграции

Формы используют React Hook Form и Zod. Server Action
`src/actions/submit-lead.ts` отправляет заявку в Telegram и Resend, когда
переменные окружения настроены.

## SEO

Динамические metadata сохраняют URL и canonical. Sitemap и robots генерируются
файлами `src/app/sitemap.ts` и `src/app/robots.ts`. Старые адреса обрабатываются
редиректами в `next.config.ts`.

## Обновление

1. Измените данные в `src/content`.
2. Добавьте оптимизированное изображение в `public/media`.
3. Выполните `npm run typecheck`, `npm run lint`, `npm run build`.
4. Разверните сборку и проверьте sitemap, robots, формы и Метрику.
