import type { FaqItem } from "@/types/faq";

type Props = {
  items: FaqItem[];
};

/**
 * Native <details>/<summary> with a pure-CSS chevron rotation (group-open:) —
 * the same pattern already proven in CollapsibleArticleSection and
 * MobileNavMenu. Previously this used Framer Motion purely to animate a
 * chevron rotation and a barely-perceptible opacity flicker (1 vs 0.92),
 * which meant every guide and calculator page paid for React state + the
 * motion bundle just for a rotating triangle CSS can do on its own.
 */
function FaqItemRow({ item }: { item: FaqItem }) {
  return (
    <details className="group border-b border-border px-4 py-3 last:border-b-0 [&_summary::-webkit-details-marker]:hidden">
      <summary className="cursor-pointer list-none text-sm font-medium text-foreground outline-none transition-colors hover:text-foreground-secondary focus-visible:ring-2 focus-visible:ring-accent/40">
        <span className="flex items-start justify-between gap-2">
          <span>{item.question}</span>
          <span
            aria-hidden
            className="mt-0.5 inline-block shrink-0 text-foreground-muted transition-transform duration-200 group-open:rotate-180"
          >
            ▾
          </span>
        </span>
      </summary>
      <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
        {item.answer}
      </p>
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
