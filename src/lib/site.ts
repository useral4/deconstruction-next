import { contacts } from "@/content/contacts";

export const siteConfig = {
  name: "Deconstruction Group",
  legalName: "ООО «Деконстракшн групп»",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://deconstruction.ru",
  description:
    "Демонтаж зданий, бетона и металлоконструкций роботами Brokk в Санкт-Петербурге, Москве и по России.",
  phone: "+7 (800) 301-67-13",
  phoneHref: "tel:+78003016713",
  secondPhone: "+7 (812) 200-77-17",
  secondPhoneHref: "tel:+78122007717",
  email: contacts.emails[0],
  social: {
    vk: "https://vk.com/public211478570",
    dzen: "https://dzen.ru/id/64ac439391e2d611e9c6fd58",
  },
} as const;

export const mainNavigation = [
  { label: "Услуги", href: "/uslugi" },
  { label: "Проекты", href: "/nashi-proekty" },
  { label: "Аренда", href: "/arenda-demontazhnykh-robotov" },
  { label: "Блог", href: "/demontazhnyy-blog" },
  { label: "Новости", href: "/novosti" },
  { label: "География", href: "/gorod" },
  { label: "Цены", href: "/price" },
  { label: "О компании", href: "/o-kompanii" },
  { label: "Контакты", href: "/kontakty" },
] as const;
