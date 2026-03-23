"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  show: boolean;
  children: ReactNode;
  className?: string;
};

/** Lightweight enter/exit for calculator result panels — avoids heavy layout animation. */
export function ResultReveal({ show, children, className = "" }: Props) {
  return (
    <AnimatePresence mode="wait">
      {show ? (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className={className}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
