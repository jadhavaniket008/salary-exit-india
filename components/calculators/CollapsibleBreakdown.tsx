import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

/**
 * Native <details>/<summary>, pure-CSS chevron rotation (group-open:) — see
 * FaqSection for the same fix and reasoning. No React state needed; the
 * browser already tracks open/closed natively.
 */
export function CollapsibleBreakdown({
  title = "Detailed breakdown",
  children,
  defaultOpen = false,
}: Props) {
  return (
    <details className="group rounded-xl border border-border bg-surface" open={defaultOpen}>
      <summary className="cursor-pointer list-none rounded-xl px-4 py-3 text-sm font-semibold text-foreground outline-none transition-colors hover:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-accent/40 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-2">
          <span>{title}</span>
          <span
            aria-hidden
            className="inline-block text-foreground-muted transition-transform duration-200 group-open:rotate-180"
          >
            ▾
          </span>
        </span>
      </summary>
      <div className="border-t border-border px-4 py-3">{children}</div>
    </details>
  );
}
