"use client";

import { CalculatorForm } from "@/components/forms/calculator-form";
import { Modal } from "@/components/ui/modal";

export function CalculatorModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Рассчитать стоимость">
      <p className="mb-6 max-w-xl leading-7 text-stone-600">
        Ответьте на несколько вопросов. Инженер изучит задачу и предложит
        подходящую технологию демонтажа.
      </p>
      <CalculatorForm />
    </Modal>
  );
}
