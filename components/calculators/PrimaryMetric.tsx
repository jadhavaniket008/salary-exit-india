"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "motion/react";
import { useCountUp } from "@/hooks/useCountUp";
import { formatInr } from "@/lib/format-inr";

type Props = {
  label: string;
  value: number;
  /** When true, animates from 0 to value */
  animate: boolean;
  helperText?: string;
};

export function PrimaryMetric({ label, value, animate, helperText }: Props) {
  const animated = useCountUp(value, animate);
  const display = animate ? animated : value;
  const controls = useAnimation();
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      void controls.start({
        boxShadow: [
          "0 0 0 0px rgba(234, 179, 8, 0)",
          "0 0 0 3px rgba(234, 179, 8, 0.45)",
          "0 0 0 0px rgba(234, 179, 8, 0)",
        ],
        transition: { duration: 0.75, ease: "easeOut" },
      });
    }
  }, [value, controls]);

  return (
    <motion.div
      animate={controls}
      className="rounded-2xl border border-zinc-200 bg-gradient-to-b from-white to-zinc-50 p-6 shadow-sm dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-950/80"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <motion.p
        key={Math.round(value)}
        initial={{ opacity: 0.85, scale: 0.995 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="mt-2 text-3xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
      >
        {formatInr(display)}
      </motion.p>
      {helperText ? (
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {helperText}
        </p>
      ) : null}
    </motion.div>
  );
}
