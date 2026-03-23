"use client";

import { motion } from "motion/react";

type Line = { label: string; amount: number };

type Props = {
  inHandMonthly: number;
  lines: Line[];
  monthlySavings: number;
};

const EXP_COLORS = [
  "bg-rose-500/85",
  "bg-amber-500/80",
  "bg-orange-500/75",
  "bg-amber-600/75",
  "bg-slate-500/75",
];

/**
 * Stacked segments as % of estimated in-hand; remainder = savings (or shortfall if expenses exceed in-hand).
 */
export function SalaryRealityIncomeExpenseBar({ inHandMonthly, lines, monthlySavings }: Props) {
  const expenseTotal = lines.reduce((a, b) => a + b.amount, 0);
  const over = expenseTotal > inHandMonthly;
  /** When over budget, scale expense segments to 100% width (mix only); otherwise scale to in-hand. */
  const base = over ? Math.max(expenseTotal, 1e-9) : Math.max(inHandMonthly, 1e-9);
  const savingsPct = over ? 0 : Math.max(0, (monthlySavings / base) * 100);

  return (
    <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">In-hand vs modeled spend</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Each segment is share of <strong>estimated monthly in-hand</strong> — a planning view, not accounting.
      </p>
      <div className="flex h-10 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
        {lines.map((line, i) => {
          const pct = Math.min(100, Math.max(0, (line.amount / base) * 100));
          const bg = EXP_COLORS[i % EXP_COLORS.length];
          return (
            <motion.div
              key={line.label}
              className={`${bg} flex min-w-0 items-center justify-center px-0.5 text-[9px] font-medium text-white`}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.04 }}
              title={`${line.label}: ${line.amount.toLocaleString("en-IN")}`}
            >
              {pct > 8 ? <span className="truncate">{line.label.split("(")[0].trim()}</span> : null}
            </motion.div>
          );
        })}
        {!over && monthlySavings >= 0 ? (
          <motion.div
            className="flex min-w-0 items-center justify-center bg-emerald-600/90 px-1 text-[10px] font-semibold text-white dark:bg-emerald-700/90"
            initial={{ width: 0 }}
            animate={{ width: `${savingsPct}%` }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
            title={`Savings: ${monthlySavings.toLocaleString("en-IN")}`}
          >
            {savingsPct > 10 ? "Savings" : ""}
          </motion.div>
        ) : null}
      </div>
      {over ? (
        <p className="text-xs font-medium text-red-700 dark:text-red-300">
          Modeled spend exceeds estimated in-hand — bar shows expense mix only (not scaled to income).
        </p>
      ) : null}
      <ul className="grid gap-1 text-xs text-zinc-600 dark:text-zinc-400 sm:grid-cols-2">
        <li>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Est. in-hand:</span>{" "}
          {inHandMonthly.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
        </li>
        <li>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Modeled spend:</span>{" "}
          {expenseTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
        </li>
      </ul>
    </div>
  );
}
