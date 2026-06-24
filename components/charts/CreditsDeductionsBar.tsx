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
    <div className="space-y-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-sm font-medium text-foreground">Credits vs deductions (scale)</p>
      <div className="flex h-8 w-full overflow-hidden rounded-lg bg-border/30">
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
      <ul className="grid gap-1 text-xs text-foreground-secondary sm:grid-cols-2">
        <li>
          <span className="font-medium text-foreground">Credits:</span>{" "}
          {credits.toLocaleString("en-IN")}
        </li>
        <li>
          <span className="font-medium text-foreground">Deductions:</span>{" "}
          {deductions.toLocaleString("en-IN")}
        </li>
      </ul>
    </div>
  );
}
