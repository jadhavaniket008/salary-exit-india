"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useReducedMotion } from "motion/react";
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
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      if (prefersReducedMotion) return;
      void controls.start({
        boxShadow: [
          "0 0 0 0px rgba(41, 160, 94, 0)",
          "0 0 0 3px rgba(41, 160, 94, 0.35)",
          "0 0 0 0px rgba(41, 160, 94, 0)",
        ],
        transition: { duration: 0.75, ease: "easeOut" },
      });
    }
  }, [value, controls, prefersReducedMotion]);

  return (
    <motion.div
      animate={controls}
      className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
        {label}
      </p>
      <motion.p
        key={prefersReducedMotion ? undefined : Math.round(value)}
        initial={prefersReducedMotion ? false : { opacity: 0.85, scale: 0.995 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        aria-hidden="true"
        className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-foreground sm:text-4xl"
      >
        {formatInr(display)}
      </motion.p>
      {/* Screen readers get exactly one announcement of the settled value —
          not the visual node above, which repaints every animation frame
          during a recalculation and would otherwise be read frame-by-frame. */}
      <span className="sr-only" role="status" aria-live="polite">
        {label}: {formatInr(value)}
      </span>
      {helperText ? (
        <p className="mt-2 text-sm text-foreground-secondary">
          {helperText}
        </p>
      ) : null}
    </motion.div>
  );
}
