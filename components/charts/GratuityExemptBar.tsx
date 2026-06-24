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
    <div className="space-y-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-sm font-medium text-foreground">Rough exempt vs taxable split (model)</p>
      <div className="flex h-8 w-full overflow-hidden rounded-lg bg-border/30">
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
      <ul className="grid gap-1 text-xs text-foreground-secondary sm:grid-cols-2">
        <li>
          <span className="font-medium text-foreground">Exempt (rough):</span>{" "}
          {exempt.toLocaleString("en-IN")}
        </li>
        <li>
          <span className="font-medium text-foreground">Taxable (rough):</span>{" "}
          {taxable.toLocaleString("en-IN")}
        </li>
      </ul>
    </div>
  );
}
