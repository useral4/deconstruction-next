import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().max(80),
  phone: z
    .string()
    .trim()
    .min(10, "Укажите номер телефона")
    .max(24, "Проверьте номер телефона")
    .regex(/^[+\d\s()\-]+$/, "Проверьте формат телефона"),
  email: z.string().trim().email("Проверьте email").or(z.literal("")),
  message: z.string().trim().max(2000),
  type: z.enum(["demolition", "estimate", "callback", "contact", "calculator"]),
  consent: z.boolean().refine(Boolean, "Необходимо согласие"),
});

export type LeadInput = z.infer<typeof leadSchema>;
