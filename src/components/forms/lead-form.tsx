"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitLead } from "@/actions/submit-lead";
import { trackGoal } from "@/lib/analytics";
import { leadSchema, type LeadInput } from "@/lib/lead-schema";
import type { LeadType } from "@/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

const goalByType: Record<LeadType, string> = {
  demolition: "form_submit",
  estimate: "form_submit",
  callback: "phone_click",
  contact: "form_submit",
  calculator: "calculator_submit",
};

export function LeadForm({
  type = "contact",
  compact = false,
  buttonText = "Отправить заявку",
  dark = false,
}: {
  type?: LeadType;
  compact?: boolean;
  buttonText?: string;
  dark?: boolean;
}) {
  const [result, setResult] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      type,
      consent: true,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setResult("");
    const response = await submitLead(values);
    setResult(response.message);
    if (response.success) {
      trackGoal(goalByType[type]);
      reset({ ...values, name: "", phone: "", email: "", message: "" });
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" {...register("type")} value={type} />
      {!compact && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="sr-only">Имя</span>
            <Input
              placeholder="Ваше имя"
              autoComplete="name"
              {...register("name")}
            />
          </label>
          <label className="block">
            <span className="sr-only">Email</span>
            <Input
              type="email"
              placeholder="Email"
              autoComplete="email"
              {...register("email")}
            />
          </label>
        </div>
      )}
      <label className="block">
        <span className="sr-only">Телефон</span>
        <Input
          type="tel"
          placeholder="+7 (___) ___-__-__"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          {...register("phone")}
        />
        {errors.phone && (
          <span className="mt-1 block text-sm text-red-600">
            {errors.phone.message}
          </span>
        )}
      </label>
      {!compact && (
        <label className="block">
          <span className="sr-only">Комментарий</span>
          <Textarea
            placeholder="Кратко опишите объект и задачу"
            {...register("message")}
          />
        </label>
      )}
      <label
        className={`flex items-start gap-3 text-xs leading-5 ${
          dark ? "text-white/60" : "text-stone-500"
        }`}
      >
        <Checkbox {...register("consent")} />
        <span>
          Я согласен с политикой конфиденциальности и обработкой персональных
          данных.
        </span>
      </label>
      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner /> : null}
        {buttonText}
      </Button>
      {result && (
        <p
          className={`flex items-start gap-2 text-sm ${
            result.startsWith("Не удалось")
              ? "text-red-600"
              : "text-emerald-600"
          }`}
          role="status"
        >
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          {result}
        </p>
      )}
    </form>
  );
}
