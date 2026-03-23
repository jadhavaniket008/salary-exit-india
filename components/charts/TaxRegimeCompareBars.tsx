"use client";

import { motion } from "motion/react";

type Props = {
  oldTaxAnnual: number;
  newTaxAnnual: number;
};

/** Compares total tax + cess — relative bar lengths only. */
export function TaxRegimeCompareBars({ oldTaxAnnual, newTaxAnnual }: Props) {
  const max = Math.max(oldTaxAnnual, newTaxAnnual, 1);
  const oldPct = Math.min(100, (oldTaxAnnual / max) * 100);
  const newPct = Math.min(100, (newTaxAnnual / max) * 100);
  return (
    <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Total tax + cess (annual)</p>
      <div className="space-y-3">
        <div>
          <div className="mb-1 flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
            <span>Old regime</span>
            <span className="tabular-nums">{oldTaxAnnual.toLocaleString("en-IN")}</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
            <motion.div
              className="h-full rounded-full bg-amber-500/90 dark:bg-amber-600/90"
              initial={{ width: 0 }}
              animate={{ width: `${oldPct}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
            <span>New regime</span>
            <span className="tabular-nums">{newTaxAnnual.toLocaleString("en-IN")}</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
            <motion.div
              className="h-full rounded-full bg-emerald-600/90 dark:bg-emerald-700/90"
              initial={{ width: 0 }}
              animate={{ width: `${newPct}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
