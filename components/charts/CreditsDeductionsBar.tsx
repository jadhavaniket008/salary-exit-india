"use client";

import { motion } from "motion/react";

type Props = {
  credits: number;
  deductions: number;
};

/** Visual split of gross credits vs deductions before net (final settlement). */
export function CreditsDeductionsBar({ credits, deductions }: Props) {
  const max = Math.max(credits + deductions, 1);
  const cPct = (credits / max) * 100;
  const dPct = (deductions / max) * 100;
  return (
    <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Credits vs deductions (scale)</p>
      <div className="flex h-8 w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
        <motion.div
          className="flex min-w-0 items-center justify-center bg-emerald-600/88 px-1 text-[10px] font-medium text-white"
          initial={{ width: 0 }}
          animate={{ width: `${cPct}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {cPct > 10 ? "Credits" : ""}
        </motion.div>
        <motion.div
          className="flex min-w-0 items-center justify-center bg-rose-600/85 px-1 text-[10px] font-medium text-white"
          initial={{ width: 0 }}
          animate={{ width: `${dPct}%` }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
        >
          {dPct > 10 ? "Deductions" : ""}
        </motion.div>
      </div>
      <ul className="grid gap-1 text-xs text-zinc-600 dark:text-zinc-400 sm:grid-cols-2">
        <li>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Credits:</span>{" "}
          {credits.toLocaleString("en-IN")}
        </li>
        <li>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Deductions:</span>{" "}
          {deductions.toLocaleString("en-IN")}
        </li>
      </ul>
    </div>
  );
}
