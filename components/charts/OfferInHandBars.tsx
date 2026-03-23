"use client";

import { motion } from "motion/react";

type Row = { label: string; inHandMonthly: number; rank: number };

type Props = {
  rows: Row[];
};

const COLORS = [
  "bg-emerald-600/90 dark:bg-emerald-700/90",
  "bg-sky-600/85 dark:bg-sky-600/85",
  "bg-violet-600/85 dark:bg-violet-600/85",
  "bg-amber-600/85 dark:bg-amber-600/85",
];

/** Relative comparison of monthly in-hand across offers — same scale. */
export function OfferInHandBars({ rows }: Props) {
  if (rows.length === 0) return null;
  const max = Math.max(...rows.map((r) => r.inHandMonthly), 1);
  return (
    <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Monthly in-hand (relative)</p>
      <ul className="space-y-2.5">
        {rows.map((r, i) => {
          const pct = Math.min(100, (r.inHandMonthly / max) * 100);
          const bg = COLORS[i % COLORS.length];
          return (
            <li key={`${r.label}-${i}`}>
              <div className="mb-1 flex justify-between gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="truncate font-medium text-zinc-800 dark:text-zinc-200">{r.label}</span>
                <span className="shrink-0 tabular-nums">
                  #{r.rank} · {r.inHandMonthly.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
                <motion.div
                  className={`h-full rounded-full ${bg}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.05 }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
