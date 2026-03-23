"use client";

import { motion } from "motion/react";

type Props = {
  labelA: string;
  labelB: string;
  valueA: number;
  valueB: number;
  title?: string;
};

/** Compare two positive magnitudes (e.g. old vs new CTC). */
export function TwoValueCompareBar({
  labelA,
  labelB,
  valueA,
  valueB,
  title = "Comparison (relative scale)",
}: Props) {
  const max = Math.max(valueA, valueB, 1);
  const aPct = (valueA / max) * 100;
  const bPct = (valueB / max) * 100;
  return (
    <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
      <div className="space-y-2">
        <div>
          <div className="mb-1 flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
            <span>{labelA}</span>
            <span className="tabular-nums">{valueA.toLocaleString("en-IN")}</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
            <motion.div
              className="h-full rounded-full bg-zinc-500/85 dark:bg-zinc-500/80"
              initial={{ width: 0 }}
              animate={{ width: `${aPct}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
            <span>{labelB}</span>
            <span className="tabular-nums">{valueB.toLocaleString("en-IN")}</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
            <motion.div
              className="h-full rounded-full bg-emerald-600/90 dark:bg-emerald-700/90"
              initial={{ width: 0 }}
              animate={{ width: `${bPct}%` }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.06 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
