"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitLead } from "@/actions/submit-lead";
import { trackGoal } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

const calculatorSchema = z.object({
  objectType: z.string().min(1),
  area: z.string().min(1, "Укажите объём или площадь"),
  deadline: z.string().min(1),
  name: z.string().optional(),
  phone: z.string().min(10, "Укажите телефон"),
  consent: z.boolean().refine(Boolean),
});

type CalculatorInput = z.infer<typeof calculatorSchema>;

export function CalculatorForm({ onSuccess }: { onSuccess?: () => void }) {
  const [result, setResult] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CalculatorInput>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: { consent: true },
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await submitLead({
      type: "calculator",
      name: values.name || "",
      phone: values.phone,
      email: "",
      consent: values.consent,
      message: [
        `Тип объекта: ${values.objectType}`,
        `Площадь/объём: ${values.area}`,
        `Срок: ${values.deadline}`,
      ].join("\n"),
    });
    setResult(response.message);
    if (response.success) {
      trackGoal("calculator_submit");
      onSuccess?.();
    }
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Select
        {...register("objectType")}
        defaultValue=""
        aria-label="Тип объекта"
      >
        <option value="" disabled>
          Тип объекта
        </option>
        <option>Здание или сооружение</option>
        <option>Бетон / железобетон</option>
        <option>Металлоконструкции</option>
        <option>Фундамент</option>
        <option>Промышленный объект</option>
      </Select>
      <Input
        placeholder="Площадь или объём"
        {...register("area")}
        aria-invalid={Boolean(errors.area)}
      />
      <Select
        {...register("deadline")}
        defaultValue=""
        aria-label="Когда начать работы"
      >
        <option value="" disabled>
          Когда начать
        </option>
        <option>Как можно скорее</option>
        <option>В течение месяца</option>
        <option>Через 1–3 месяца</option>
        <option>Пока нужен расчёт</option>
      </Select>
      <Input placeholder="Ваше имя" {...register("name")} />
      <Input
        type="tel"
        placeholder="+7 (___) ___-__-__"
        {...register("phone")}
        aria-invalid={Boolean(errors.phone)}
      />
      <label className="flex items-start gap-3 text-xs leading-5 text-stone-500">
        <Checkbox {...register("consent")} />
        <span>Согласен на обработку данных</span>
      </label>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          Получить расчёт
        </Button>
      </div>
      {result && (
        <p className="text-sm text-emerald-700 sm:col-span-2" role="status">
          {result}
        </p>
      )}
    </form>
  );
}
