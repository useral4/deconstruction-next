import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const EXPORT = path.join(ROOT, "legacy", "tilda-export");
const DOCS = path.join(ROOT, "_docs");
const CONTENT = path.join(ROOT, "src", "content");
const DATA = path.join(ROOT, "_data");

const DOMAIN = "https://deconstruction.ru";
const HOME_PAGE = "page21384401.html";

function read(file) {
  return fs.readFileSync(path.join(EXPORT, file), "utf8");
}

function escTs(str) {
  return JSON.stringify(str ?? "");
}

function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function parseMeta(html, file) {
  const $ = cheerio.load(html, { decodeEntities: false });
  const pageId = $("div#allrecords").attr("data-tilda-page-id") || file.replace(/\D/g, "");
  const alias = $("div#allrecords").attr("data-tilda-page-alias") || null;

  const headings = {};
  for (let level = 1; level <= 6; level++) {
    headings[`h${level}`] = [];
    $(`h${level}`).each((_, el) => {
      const text = stripHtml($(el).html() || "");
      if (text) headings[`h${level}`].push(text);
    });
  }

  const canonical =
    $('link[rel="canonical"]').attr("href") ||
    $('meta[property="og:url"]').attr("content") ||
    null;

  const images = new Set();
  $("img[src], source[srcset], [style*='background-image']").each((_, el) => {
    const src = $(el).attr("src");
    if (src) images.add(src);
    const srcset = $(el).attr("srcset");
    if (srcset) srcset.split(",").forEach((p) => images.add(p.trim().split(" ")[0]));
    const style = $(el).attr("style") || "";
    const m = style.match(/url\(['"]?([^'")]+)/);
    if (m) images.add(m[1]);
  });

  const cdnUrls = [...images].filter((u) => /tildacdn|static\.tildacdn/i.test(u));

  const forms = [];
  $("form.t-form, form.js-form-proccess").each((_, el) => {
    const $f = $(el);
    const fields = [];
    $f.find("[data-field-name], input[name], select[name], textarea[name]").each((__, field) => {
      const name =
        $(field).attr("data-field-name") ||
        $(field).attr("name") ||
        $(field).attr("placeholder");
      const type = $(field).attr("data-field-type") || $(field).attr("type") || "text";
      if (name && !name.startsWith("formservices")) fields.push({ name, type });
    });
    const popup = $f.closest(".t-popup");
    forms.push({
      id: $f.attr("id") || null,
      title: popup.find(".t702__title, .t-popup__title").first().text().trim() || null,
      recordType: $f.closest(".r").attr("data-record-type") || null,
      fields: [...new Map(fields.map((f) => [f.name, f])).values()],
    });
  });

  const quizzes = [];
  $("[class*='t835__quiz'], [class*='t862__quiz']").each((_, el) => {
    const title = $(el).find(".t835__quiz-description-title, .t862__quiz-title").first().text().trim();
    if (title || $(el).find(".t835__quiz-question, .t862__quiz-question").length) {
      quizzes.push({
        title: title || "Квиз",
        questions: $(el)
          .find(".t835__quiz-question, .t862__quiz-question")
          .map((__, q) => stripHtml($(q).html() || ""))
          .get()
          .filter(Boolean),
      });
    }
  });

  const ctas = [];
  $("a[href*='#popup'], a[data-tooltip-hook], .t-btn, .t-submit").each((_, el) => {
    const text = stripHtml($(el).html() || "");
    const href = $(el).attr("href") || $(el).attr("data-tooltip-hook") || "";
    if (text && text.length < 120) ctas.push({ text, href });
  });

  return {
    file,
    pageId,
    alias,
    title: $("title").text().trim(),
    description: $('meta[name="description"]').attr("content")?.trim() || "",
    keywords: $('meta[name="keywords"]').attr("content")?.trim() || "",
    canonical,
    og: {
      title: $('meta[property="og:title"]').attr("content") || "",
      description: $('meta[property="og:description"]').attr("content") || "",
      image: $('meta[property="og:image"]').attr("content") || "",
      type: $('meta[property="og:type"]').attr("content") || "",
    },
    headings,
    h1: headings.h1[0] || "",
    images: [...images],
    cdnUrls,
    forms,
    quizzes,
    ctas: [...new Map(ctas.map((c) => [`${c.text}|${c.href}`, c])).values()].slice(0, 30),
  };
}

function parseHtaccess() {
  const text = read("htaccess");
  const urlMap = {};
  const redirects301 = [];

  const rewriteRe = /^RewriteRule\s+\^([^\$]+)\$?\s+(\S+)/gm;
  let m;
  while ((m = rewriteRe.exec(text)) !== null) {
    const from = m[1].replace(/\\\./g, ".").replace(/\\/g, "");
    const to = m[2];
    if (to.startsWith("page") && to.endsWith(".html")) {
      urlMap[from.replace(/\/$/, "")] = to;
    } else if (to.includes("deconstruction.ru") || to.startsWith("https://")) {
      redirects301.push({ from: `/${from.replace(/\/$/, "")}`, to: to.replace(/\\\./g, ".").replace(/\\/g, "") });
    }
  }

  const homePage = text.match(/DirectoryIndex\s+(\S+)/)?.[1] || HOME_PAGE;
  urlMap[""] = homePage;

  return { urlMap, redirects301, homePage };
}

function parseSitemap() {
  const xml = read("sitemap.xml");
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) urls.push(m[1].trim());
  return urls;
}

function parseRobots() {
  const text = read("robots.txt");
  const disallow = [];
  for (const line of text.split("\n")) {
    const d = line.match(/^Disallow:\s*(.*)/i);
    if (d && d[1].trim()) disallow.push(d[1].trim());
  }
  const sitemaps = [...text.matchAll(/^Sitemap:\s*(.+)/gim)].map((x) => x[1].trim());
  return { disallow, sitemaps, raw: text };
}

function pageToUrl(file, urlMap) {
  const entry = Object.entries(urlMap).find(([, f]) => f === file);
  if (!entry) return null;
  const slug = entry[0];
  return slug ? `${DOMAIN}/${slug}` : DOMAIN;
}

function categorizeUrl(url) {
  const path = url.replace(DOMAIN, "").replace(/^\//, "");
  if (!path) return "home";
  if (path.startsWith("uslugi")) return "service";
  if (path.startsWith("nashi-proekty")) return "case";
  if (path.startsWith("demontazhnyy-blog")) return "blog";
  if (path.startsWith("novosti")) return "news";
  if (path.startsWith("arenda-demontazhnykh-robotov")) return "rental";
  if (path.startsWith("demontazh-robotami-v-") || path.includes("-rajon") || path.includes("metro")) return "geo";
  if (["kontakty", "o-kompanii", "politika-konfidentsialnosti", "karta-sayta", "price", "tehnologii", "kak-my-rabotaem"].includes(path)) {
    return "static";
  }
  return "other";
}

function extractMenu(html) {
  const $ = cheerio.load(html);
  const items = [];

  function walk($container, depth = 0) {
    $container.find("> li").each((_, li) => {
      const $li = $(li);
      const $link = $li.find("> .t978__menu-link-wrapper a, > a.t-menu__link-item, > a.t978__menu-link").first();
      const label = $link.find(".t978__link-inner, span").first().text().trim() || $link.text().trim();
      const href = $link.attr("href") || "";
      const hook = $link.attr("data-menu-submenu-hook") || "";
      const item = { label, href: href === "#" ? null : href, depth, submenuHook: hook || null };
      items.push(item);
      const $sub = $li.find(`> .t978__menu-submenu[data-submenu-hook='${hook}'], > .t-menusub`).first();
      if ($sub.length && hook) walk($sub.find("ul").first().length ? $sub.find("ul").first() : $sub, depth + 1);
    });
  }

  $("nav .t978__menu, .t978__menu, .t228__centerside .t-menu").each((_, nav) => walk($(nav)));
  $("a.t-menu__link-item[href^='/'], a.t-menu__link-item[href^='http']").each((_, a) => {
    const href = $(a).attr("href");
    const label = $(a).text().trim();
    if (label && href && !items.some((i) => i.href === href && i.label === label)) {
      items.push({ label, href, depth: 0, submenuHook: null });
    }
  });

  return [...new Map(items.map((i) => [`${i.label}|${i.href}`, i])).values()];
}

function extractFaq(html) {
  const $ = cheerio.load(html);
  const faq = [];
  $(".t668__accordion, .t668__col").each((_, block) => {
    const q = stripHtml($(block).find(".t668__title").first().html() || "");
    const a = stripHtml($(block).find(".t668__text").first().html() || "");
    if (q && a) faq.push({ question: q, answer: a });
  });
  return faq;
}

function extractReviews(html) {
  const $ = cheerio.load(html);
  const reviews = [];
  $(".t799__col, .t-review, [class*='t-review']").each((_, block) => {
    const author = stripHtml($(block).find(".t799__title, .t-review__author").first().html() || "");
    const text = stripHtml($(block).find(".t799__descr, .t-review__text").first().html() || "");
    if (text) reviews.push({ author: author || "Клиент", text });
  });
  $("img[alt*='лагодар'], img[alt*='отзыв'], meta[itemprop='caption']").each((_, el) => {
    const alt = $(el).attr("alt") || $(el).attr("content") || "";
    const src = $(el).attr("src") || $(el).attr("content") || "";
    if (alt && /благодар|отзыв|письмо/i.test(alt)) {
      reviews.push({ author: alt.trim(), text: src ? `Изображение: ${src}` : alt.trim() });
    }
  });
  return [...new Map(reviews.map((r) => [`${r.author}|${r.text}`, r])).values()];
}

function extractContacts(html) {
  const $ = cheerio.load(html);
  const text = $("body").text();
  const phones = new Set();
  for (const m of text.matchAll(/\+7[\s(.-]?\d{3}[\s).-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}/g)) {
    phones.add(m[0].replace(/\s+/g, " ").trim());
  }
  $("a[href^='tel:']").each((_, a) => {
    const tel = ($(a).attr("href") || "").replace(/^tel:/i, "").trim();
    if (tel) phones.add(tel);
  });
  const emails = new Set();
  for (const m of text.matchAll(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi)) {
    emails.add(m[0].toLowerCase());
  }
  const addresses = [];
  $("a[href*='maps'], a[href*='yandex']").each((_, a) => {
    const t = $(a).text().trim();
    if (t.length > 10) addresses.push(t);
  });
  return {
    phones: [...phones],
    emails: [...emails].filter((e) => !e.includes("formservices")),
    addresses: [...new Set(addresses)],
  };
}

function extractCasesFromPages(pages) {
  return pages
    .filter((p) => p.url && p.url.includes("/nashi-proekty/") && p.url !== `${DOMAIN}/nashi-proekty`)
    .map((p) => ({
      id: p.pageId,
      slug: p.url.replace(`${DOMAIN}/nashi-proekty/`, ""),
      title: p.h1 || p.title.split("|")[0].trim(),
      url: p.url,
      description: p.description,
    }));
}

function extractServicesFromPages(pages) {
  return pages
    .filter((p) => {
      const cat = categorizeUrl(p.url || "");
      return cat === "service" || cat === "rental";
    })
    .map((p) => ({
      id: p.pageId,
      slug: (p.url || "").replace(DOMAIN + "/", ""),
      title: p.h1 || p.title.split("|")[0].trim(),
      url: p.url,
      description: p.description,
    }));
}

function writeTs(file, content) {
  fs.writeFileSync(path.join(CONTENT, file), content, "utf8");
}

function buildPagesTs(pages) {
  const lines = pages
    .filter((p) => p.url)
    .map(
      (p) => `  {
    id: ${escTs(p.pageId)},
    slug: ${escTs((p.url || "").replace(DOMAIN + "/", "") || "/")},
    url: ${escTs(p.url)},
    file: ${escTs(p.file)},
    title: ${escTs(p.title)},
    description: ${escTs(p.description)},
    h1: ${escTs(p.h1)},
    category: ${escTs(categorizeUrl(p.url))},
    canonical: ${escTs(p.canonical)},
  }`,
    );
  return `/** Auto-generated from Tilda export — этап 0 */\n\nexport interface PageMeta {\n  id: string;\n  slug: string;\n  url: string;\n  file: string;\n  title: string;\n  description: string;\n  h1: string;\n  category: string;\n  canonical: string | null;\n}\n\nexport const pages: PageMeta[] = [\n${lines.join(",\n")}\n];\n`;
}

function main() {
  for (const dir of [DOCS, CONTENT, DATA, path.join(ROOT, "public", "images")]) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const htmlFiles = fs
    .readdirSync(EXPORT)
    .filter((f) => f.endsWith(".html") && f !== "404.html");

  const { urlMap, redirects301, homePage } = parseHtaccess();
  const sitemapUrls = parseSitemap();
  const robots = parseRobots();

  const pages = htmlFiles.map((file) => {
    const html = read(file);
    const meta = parseMeta(html, file);
    meta.url = pageToUrl(file, urlMap);
    return meta;
  });

  const homeHtml = read(homePage);
  const menu = extractMenu(homeHtml);
  const faq = [...new Map(extractFaq(homeHtml).map((f) => [f.question, f])).values()];
  const reviews = extractReviews(homeHtml);

  const kontaktyPage = pages.find((p) => p.alias === "kontakty" || p.file === "page21425703.html");
  const contacts = kontaktyPage ? extractContacts(read(kontaktyPage.file)) : { phones: [], emails: [], addresses: [] };

  const services = extractServicesFromPages(pages);
  const cases = extractCasesFromPages(pages);

  const allCdnUrls = [...new Set(pages.flatMap((p) => p.cdnUrls))];
  const localImages = fs
    .readdirSync(path.join(EXPORT, "images"))
    .filter((f) => !f.startsWith("."));

  const formsAll = pages.flatMap((p) =>
    p.forms.map((f) => ({ ...f, pageUrl: p.url, pageFile: p.file })),
  );
  const quizzesAll = pages.flatMap((p) =>
    p.quizzes.map((q) => ({ ...q, pageUrl: p.url, pageFile: p.file })),
  );

  // Save JSON data for CDN download & redirects
  fs.writeFileSync(
    path.join(DATA, "audit.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        stats: {
          htmlPages: pages.length,
          sitemapUrls: sitemapUrls.length,
          redirects301: redirects301.length,
          urlMappings: Object.keys(urlMap).length,
          services: services.length,
          cases: cases.length,
          faq: faq.length,
          reviews: reviews.length,
          localImages: localImages.length,
          cdnImages: allCdnUrls.length,
          forms: formsAll.length,
          quizzes: quizzesAll.length,
        },
        urlMap,
        redirects301,
        sitemapUrls,
        robots,
        menu,
        pages,
        forms: formsAll,
        quizzes: quizzesAll,
        cdnUrls: allCdnUrls,
      },
      null,
      2,
    ),
  );

  // Content TS files
  writeTs(
    "contacts.ts",
    `/** Auto-generated from Tilda export — этап 0 */\n\nexport const contacts = {\n  phones: ${JSON.stringify(contacts.phones, null, 2)},\n  emails: ${JSON.stringify(contacts.emails, null, 2)},\n  addresses: ${JSON.stringify(contacts.addresses, null, 2)},\n  company: "Брокк Демонтаж (БДСЗ)",\n  site: "https://deconstruction.ru",\n} as const;\n`,
  );

  writeTs(
    "services.ts",
    `/** Auto-generated from Tilda export — этап 0 */\n\nexport interface Service {\n  id: string;\n  slug: string;\n  title: string;\n  url: string;\n  description: string;\n}\n\nexport const services: Service[] = ${JSON.stringify(services, null, 2)};\n`,
  );

  writeTs(
    "cases.ts",
    `/** Auto-generated from Tilda export — этап 0 */\n\nexport interface CaseStudy {\n  id: string;\n  slug: string;\n  title: string;\n  url: string;\n  description: string;\n}\n\nexport const cases: CaseStudy[] = ${JSON.stringify(cases, null, 2)};\n`,
  );

  writeTs(
    "faq.ts",
    `/** Auto-generated from Tilda export — этап 0 (главная) */\n\nexport interface FaqItem {\n  question: string;\n  answer: string;\n}\n\nexport const faq: FaqItem[] = ${JSON.stringify(faq, null, 2)};\n`,
  );

  writeTs(
    "reviews.ts",
    `/** Auto-generated from Tilda export — этап 0 (главная) */\n\nexport interface Review {\n  author: string;\n  text: string;\n}\n\nexport const reviews: Review[] = ${JSON.stringify(reviews, null, 2)};\n`,
  );

  writeTs("pages.ts", buildPagesTs(pages));

  // site-audit.md
  const byCategory = {};
  for (const p of pages.filter((x) => x.url)) {
    const cat = categorizeUrl(p.url);
    byCategory[cat] = (byCategory[cat] || 0) + 1;
  }

  const auditMd = `# Аудит сайта deconstruction.ru (Tilda → Next.js)

> Сгенерировано: ${new Date().toISOString().slice(0, 10)}  
> Источник: \`legacy/tilda-export/\`

## Сводка

| Метрика | Значение |
|---------|----------|
| HTML-страниц в экспорте | ${pages.length} |
| URL в sitemap.xml | ${sitemapUrls.length} |
| ЧПУ-маппингов (htaccess) | ${Object.keys(urlMap).length} |
| 301-редиректов | ${redirects301.length} |
| Услуг | ${services.length} |
| Кейсов (портфолио) | ${cases.length} |
| FAQ (главная) | ${faq.length} |
| Отзывов (главная) | ${reviews.length} |
| Локальных изображений | ${localImages.length} |
| CDN-изображений (в HTML) | ${allCdnUrls.length} |
| Форм | ${formsAll.length} |
| Квизов | ${quizzesAll.length} |

## Структура по разделам

${Object.entries(byCategory)
  .sort((a, b) => b[1] - a[1])
  .map(([k, v]) => `- **${k}**: ${v} стр.`)
  .join("\n")}

## Главная страница

- **Файл:** \`${homePage}\`
- **URL:** ${DOMAIN}
- **Title:** ${pages.find((p) => p.file === homePage)?.title || "—"}

## Меню (верхний уровень)

${menu
  .filter((m) => m.depth === 0 && m.label)
  .slice(0, 25)
  .map((m) => `- ${m.label}${m.href ? ` → \`${m.href}\`` : " (подменю)"}`)
  .join("\n")}

## SEO — robots.txt

\`\`\`
${robots.raw.trim()}
\`\`\`

**Disallow:** ${robots.disallow.length} правил  
**Sitemaps:** ${robots.sitemaps.join(", ")}

## SEO — sitemap

Файл: \`legacy/tilda-export/sitemap.xml\`  
Первые URL:

${sitemapUrls
  .slice(0, 15)
  .map((u) => `- ${u}`)
  .join("\n")}

…и ещё ${Math.max(0, sitemapUrls.length - 15)} URL.

## Карта редиректов (301)

Полный список: \`_data/audit.json → redirects301\`

Примеры:

${redirects301
  .slice(0, 20)
  .map((r) => `- \`${r.from}\` → \`${r.to}\``)
  .join("\n")}

## Формы и CTA

### Типы форм на сайте

${[...new Set(formsAll.map((f) => f.title || "Без названия"))]
  .map((t) => `- ${t}`)
  .join("\n")}

### Поля основной формы заказа

- Имя (Name)
- Телефон (Phone)
- Комментарий
- Загрузка файлов (Yandex Disk widget)
- Дата демонтажа
- Канал связи (Selectbox: WhatsApp / Telegram / Email)
- Согласие с политикой конфиденциальности

### Квизы

${quizzesAll.length ? quizzesAll.map((q) => `- ${q.title} (${q.pageUrl || q.pageFile})`).join("\n") : "—"}

## Контакты

- **Телефоны:** ${contacts.phones.join(", ") || "—"}
- **Email:** ${contacts.emails.join(", ") || "—"}

## Индексация (требует ручной проверки)

- [ ] Яндекс.Вебмастер — проверить количество страниц в индексе
- [ ] Google Search Console — проверить покрытие
- [ ] Яндекс.Метрика — топ страниц по трафику (задача 0.17)
- [ ] Позиции по ключевым запросам (задача 0.18)

> Для пунктов 0.15–0.18 нужен доступ к Метрике и Search Console.

## Медиа

- Локальные файлы: \`legacy/tilda-export/images/\` (${localImages.length} файлов)
- Целевая папка Next.js: \`public/images/\`
- CDN URL для выгрузки: ${allCdnUrls.length} (см. \`_data/audit.json\`)

## Файлы контента

| Файл | Описание |
|------|----------|
| \`src/content/pages.ts\` | Все страницы + SEO |
| \`src/content/services.ts\` | Услуги |
| \`src/content/cases.ts\` | Кейсы |
| \`src/content/faq.ts\` | FAQ с главной |
| \`src/content/reviews.ts\` | Отзывы с главной |
| \`src/content/contacts.ts\` | Контакты |

## Title / Description — все страницы

| URL | Title | H1 |
|-----|-------|-----|
${pages
  .filter((p) => p.url)
  .sort((a, b) => (a.url || "").localeCompare(b.url || ""))
  .map((p) => `| ${p.url} | ${p.title.replace(/\|/g, "\\|").slice(0, 60)}… | ${(p.h1 || "—").slice(0, 40)} |`)
  .join("\n")}

`;

  fs.writeFileSync(path.join(DOCS, "site-audit.md"), auditMd, "utf8");

  console.log("Audit complete:");
  console.log(JSON.stringify(JSON.parse(fs.readFileSync(path.join(DATA, "audit.json"), "utf8")).stats, null, 2));
}

main();
