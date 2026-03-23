"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ROUTES } from "@/lib/routes";

/**
 * Lightweight sticky CTA on small screens after scroll — calculators hub.
 */
export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
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
              className="flex items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
            >
              Open calculators
            </Link>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
