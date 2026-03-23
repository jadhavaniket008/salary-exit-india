"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { motion } from "motion/react";

type Props = {
  title?: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function CollapsibleBreakdown({
  title = "Detailed breakdown",
  children,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <details
      className="group rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary className="cursor-pointer list-none rounded-xl px-4 py-3 text-sm font-semibold text-zinc-900 outline-none transition-colors hover:bg-zinc-50/90 focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-100 dark:hover:bg-zinc-900/60 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-2">
          <span>{title}</span>
          <motion.span
            aria-hidden
            className="inline-block text-zinc-400"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            ▾
          </motion.span>
        </span>
      </summary>
      <motion.div
        className="border-t border-zinc-200 px-4 py-3 dark:border-zinc-800"
        initial={false}
        animate={{ opacity: open ? 1 : 0.96 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </details>
  );
}
