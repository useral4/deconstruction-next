"use server";

import { leadSchema } from "@/lib/lead-schema";
import type { LeadResult } from "@/types";

const leadLabels = {
  demolition: "Заказать демонтаж",
  estimate: "Заказать расчёт",
  callback: "Обратный звонок",
  contact: "Контактная форма",
  calculator: "Калькулятор",
} as const;

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      cache: "no-store",
    },
  );
  return response.ok;
}

async function sendEmail(subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;
  if (!apiKey || !to || !from) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, text }),
    cache: "no-store",
  });
  return response.ok;
}

export async function submitLead(input: unknown): Promise<LeadResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Проверьте заполнение формы",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const lead = parsed.data;
  const subject = `Новая заявка: ${leadLabels[lead.type]}`;
  const text = [
    subject,
    `Имя: ${lead.name || "не указано"}`,
    `Телефон: ${lead.phone}`,
    `Email: ${lead.email || "не указан"}`,
    `Комментарий: ${lead.message || "не указан"}`,
    `Источник: deconstruction.ru / ${lead.type}`,
  ].join("\n");

  try {
    const [telegram, email] = await Promise.all([
      sendTelegram(text),
      sendEmail(subject, text),
    ]);
    const integrationsConfigured =
      Boolean(process.env.TELEGRAM_BOT_TOKEN) ||
      Boolean(process.env.RESEND_API_KEY);

    if (integrationsConfigured && !telegram && !email) {
      return {
        success: false,
        message: "Не удалось отправить заявку. Позвоните нам по телефону.",
      };
    }

    return {
      success: true,
      message: integrationsConfigured
        ? "Заявка отправлена. Мы скоро свяжемся с вами."
        : "Форма работает в демонстрационном режиме. Подключите ключи в .env.",
    };
  } catch {
    return {
      success: false,
      message: "Не удалось отправить заявку. Позвоните нам по телефону.",
    };
  }
}
