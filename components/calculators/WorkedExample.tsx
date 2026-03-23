"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

export function WorkedExample({
        title = "Worked example (same engine as live calculator)",
  children,
}: Props) {
  return (
    <motion.section
      aria-labelledby="worked-example-heading"
      className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2
        id="worked-example-heading"
        className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
      >
        {title}
      </h2>
      <div className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </motion.section>
  );
}
