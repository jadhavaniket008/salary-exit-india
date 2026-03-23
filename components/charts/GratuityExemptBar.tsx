"use client";

import { motion } from "motion/react";

type Props = {
  exempt: number;
  taxable: number;
};

export function GratuityExemptBar({ exempt, taxable }: Props) {
  const total = exempt + taxable;
  if (total <= 0) return null;
  const exPct = (exempt / total) * 100;
  const txPct = (taxable / total) * 100;
  return (
    <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Rough exempt vs taxable split (model)</p>
      <div className="flex h-8 w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
        <motion.div
          className="flex min-w-0 items-center justify-center bg-emerald-600/88 px-1 text-[10px] font-medium text-white"
          initial={{ width: 0 }}
          animate={{ width: `${exPct}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {exPct > 12 ? "Exempt" : ""}
        </motion.div>
        <motion.div
          className="flex min-w-0 items-center justify-center bg-amber-500/85 px-1 text-[10px] font-medium text-white"
          initial={{ width: 0 }}
          animate={{ width: `${txPct}%` }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
        >
          {txPct > 12 ? "Taxable" : ""}
        </motion.div>
      </div>
      <ul className="grid gap-1 text-xs text-zinc-600 dark:text-zinc-400 sm:grid-cols-2">
        <li>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Exempt (rough):</span>{" "}
          {exempt.toLocaleString("en-IN")}
        </li>
        <li>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Taxable (rough):</span>{" "}
          {taxable.toLocaleString("en-IN")}
        </li>
      </ul>
    </div>
  );
}
