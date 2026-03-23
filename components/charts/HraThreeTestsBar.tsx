"use client";

import { motion } from "motion/react";

type Props = {
  test1ActualHra: number;
  test2RentMinus: number;
  test3SalaryCap: number;
  exemption: number;
};

/** Visualizes the three Section 10(13A) tests vs the exemption (minimum). */
export function HraThreeTestsBar({
  test1ActualHra,
  test2RentMinus,
  test3SalaryCap,
  exemption,
}: Props) {
  const rows = [
    { label: "Test 1 — HRA received", value: test1ActualHra, tone: "bg-zinc-500/80" },
    { label: "Test 2 — Rent − 10% of salary", value: test2RentMinus, tone: "bg-sky-600/85" },
    { label: "Test 3 — % cap on salary", value: test3SalaryCap, tone: "bg-violet-600/85" },
  ];
  const max = Math.max(...rows.map((r) => r.value), exemption, 1);
  return (
    <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Three tests (annual)</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Exemption = min of the three (~{exemption.toLocaleString("en-IN")} here).
      </p>
      <ul className="space-y-2">
        {rows.map((r, i) => {
          const pct = Math.min(100, (r.value / max) * 100);
          return (
            <li key={r.label}>
              <div className="mb-1 flex justify-between gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
                <span className="leading-tight">{r.label}</span>
                <span className="shrink-0 tabular-nums">{r.value.toLocaleString("en-IN")}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
                <motion.div
                  className={`h-full rounded-full ${r.tone}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.06 }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
