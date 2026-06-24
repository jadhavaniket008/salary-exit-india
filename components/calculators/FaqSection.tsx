"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { FaqItem } from "@/types/faq";

type Props = {
  items: FaqItem[];
};

function FaqItemRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="group border-b border-border px-4 py-3 last:border-b-0 [&_summary::-webkit-details-marker]:hidden"
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary className="cursor-pointer list-none text-sm font-medium text-foreground outline-none transition-colors hover:text-foreground-secondary focus-visible:ring-2 focus-visible:ring-accent/40">
        <span className="flex items-start justify-between gap-2">
          <span>{item.question}</span>
          <motion.span
            aria-hidden
            className="mt-0.5 inline-block shrink-0 text-foreground-muted"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            ▾
          </motion.span>
        </span>
      </summary>
      <motion.p
        className="mt-2 text-sm leading-relaxed text-foreground-secondary"
        initial={false}
        animate={{ opacity: open ? 1 : 0.92 }}
        transition={{ duration: 0.2 }}
      >
        {item.answer}
      </motion.p>
    </details>
  );
}

export function FaqSection({ items }: Props) {
  return (
    <section aria-labelledby="faq-heading" className="space-y-3">
      <h2
        id="faq-heading"
        className="text-lg font-semibold text-foreground"
      >
        FAQ
      </h2>
      <div className="rounded-xl border border-border">
        {items.map((item, idx) => (
          <FaqItemRow key={`${idx}-${item.question}`} item={item} />
        ))}
      </div>
    </section>
  );
}
