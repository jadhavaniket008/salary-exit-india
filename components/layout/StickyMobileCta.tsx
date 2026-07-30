"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ROUTES } from "@/lib/routes";
import { CALCULATOR_REGISTRY } from "@/lib/calculator-registry";

const CALCULATOR_PATHS = new Set(
  Object.values(CALCULATOR_REGISTRY).map((c) => c.path)
);

/**
 * Lightweight sticky CTA on small screens after scroll — calculators hub.
 * Suppressed on calculator pages themselves: those already have a clear,
 * non-sticky primary CTA (the Calculate button), and a fixed bar floating
 * over the bottom of the viewport risks covering the last form field or
 * that button on a long mobile form.
 */
export function StickyMobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const onCalculatorPage = CALCULATOR_PATHS.has(pathname);

  useEffect(() => {
    if (onCalculatorPage) {
      setVisible(false);
      return;
    }
    const onScroll = () => {
      setVisible(window.scrollY > 320 && window.innerWidth < 768);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onCalculatorPage]);

  return (
    <AnimatePresence>
      {visible && !onCalculatorPage ? (
        <motion.div
          className="fixed bottom-4 left-3 right-3 z-40 md:hidden"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={ROUTES.calculators}
              className="flex items-center justify-center rounded-2xl bg-accent-solid px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
            >
              Open calculators
            </Link>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
