"use client";

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

export function trackGoal(goal: string) {
  const id = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);
  if (id && typeof window !== "undefined" && window.ym) {
    window.ym(id, "reachGoal", goal);
  }
}
