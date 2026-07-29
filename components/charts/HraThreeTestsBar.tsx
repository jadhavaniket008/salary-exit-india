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
  const minValue = Math.min(...rows.map((r) => r.value));
  const taxableHra = Math.max(0, test1ActualHra - exemption);

  return (
    <div className="space-y-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-sm font-medium text-foreground">Three tests (annual)</p>
      <p className="text-xs text-foreground-muted">
        Exemption = the lowest of the three tests below — the tax rules don't let you pick.
      </p>
      <ul className="space-y-2">
        {rows.map((r, i) => {
          const pct = Math.min(100, (r.value / max) * 100);
          const isBinding = r.value === minValue;
          return (
            <li key={r.label}>
              <div className="mb-1 flex justify-between gap-2 text-[11px] text-foreground-secondary">
                <span className="leading-tight">
                  {r.label}
                  {isBinding ? (
                    <span className="ml-1.5 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200">
                      Binding — sets your exemption
                    </span>
                  ) : null}
                </span>
                <span className="shrink-0 tabular-nums">{r.value.toLocaleString("en-IN")}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-border/30">
                <motion.div
                  className={`h-full rounded-full ${r.tone} ${isBinding ? "ring-2 ring-emerald-500 ring-offset-1 ring-offset-surface" : ""}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.06 }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
        <span className="text-foreground-secondary">Taxable HRA (received − exemption)</span>
        <span className="font-semibold tabular-nums text-foreground">
          ₹{taxableHra.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
}
