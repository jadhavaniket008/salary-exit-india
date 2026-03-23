"use client";

import { motion } from "motion/react";

/**
 * Lightweight horizontal stacked-style bars — no chart library; uses flex % widths from gross.
 */
type Row = { label: string; amount: number; tone: "neutral" | "deduct" | "net" };

type Props = {
  grossMonthly: number;
  rows: Row[];
  title?: string;
};

export function InHandBreakdownBars({
  grossMonthly,
  rows,
  title = "Where your monthly gross goes (same numbers as the table)",
}: Props) {
  const g = Math.max(grossMonthly, 1e-9);
  return (
    <motion.div
      className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
      <div className="flex h-8 w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
        {rows.map((r) => {
          const pct = Math.max(0, Math.min(100, (Math.abs(r.amount) / g) * 100));
          const bg =
            r.tone === "net"
              ? "bg-emerald-600/90 dark:bg-emerald-700/90"
              : r.tone === "deduct"
                ? "bg-amber-500/85 dark:bg-amber-600/80"
                : "bg-zinc-400/70 dark:bg-zinc-600/80";
          return (
            <div
              key={r.label}
              className={`${bg} flex min-w-0 items-center justify-center px-1 text-[10px] font-medium text-white`}
              style={{ width: `${pct}%` }}
              title={`${r.label}: ${r.amount.toFixed(0)}`}
            >
              {pct > 8 ? <span className="truncate">{r.label}</span> : null}
            </div>
          );
        })}
      </div>
      <ul className="grid gap-1 text-xs text-zinc-600 dark:text-zinc-400 sm:grid-cols-2">
        {rows.map((r) => (
          <li key={r.label}>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">{r.label}:</span>{" "}
            {r.amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
