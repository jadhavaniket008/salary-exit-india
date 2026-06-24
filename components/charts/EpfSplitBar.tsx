"use client";

import { motion } from "motion/react";

type Props = {
  employeeMonthly: number;
  employerMonthly: number;
};

export function EpfSplitBar({ employeeMonthly, employerMonthly }: Props) {
  const total = employeeMonthly + employerMonthly;
  const empPct = total > 0 ? (employeeMonthly / total) * 100 : 0;
  const erPct = total > 0 ? (employerMonthly / total) * 100 : 0;
  return (
    <div className="space-y-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-sm font-medium text-foreground">Employee vs employer (monthly)</p>
      <div className="flex h-8 w-full overflow-hidden rounded-lg bg-border/30">
        <motion.div
          className="flex min-w-0 items-center justify-center bg-emerald-600/90 px-1 text-[10px] font-medium text-white dark:bg-emerald-700/90"
          initial={{ width: 0 }}
          animate={{ width: `${empPct}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          title={`Employee: ${employeeMonthly}`}
        >
          {empPct > 14 ? "Employee" : ""}
        </motion.div>
        <motion.div
          className="flex min-w-0 items-center justify-center bg-sky-600/85 text-[10px] font-medium text-white"
          initial={{ width: 0 }}
          animate={{ width: `${erPct}%` }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
          title={`Employer: ${employerMonthly}`}
        >
          {erPct > 14 ? "Employer" : ""}
        </motion.div>
      </div>
      <ul className="grid gap-1 text-xs text-foreground-secondary sm:grid-cols-2">
        <li>
          <span className="font-medium text-foreground">Employee:</span>{" "}
          {employeeMonthly.toLocaleString("en-IN")}
        </li>
        <li>
          <span className="font-medium text-foreground">Employer:</span>{" "}
          {employerMonthly.toLocaleString("en-IN")}
        </li>
      </ul>
    </div>
  );
}
