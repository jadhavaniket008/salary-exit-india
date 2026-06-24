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
      className="group rounded-xl border border-border bg-surface"
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary className="cursor-pointer list-none rounded-xl px-4 py-3 text-sm font-semibold text-foreground outline-none transition-colors hover:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-accent/40 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-2">
          <span>{title}</span>
          <motion.span
            aria-hidden
            className="inline-block text-foreground-muted"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            ▾
          </motion.span>
        </span>
      </summary>
      <motion.div
        className="border-t border-border px-4 py-3"
        initial={false}
        animate={{ opacity: open ? 1 : 0.96 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </details>
  );
}
