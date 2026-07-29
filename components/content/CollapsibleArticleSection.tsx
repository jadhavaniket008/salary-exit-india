import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  /** Open by default — use sparingly, only for the single most important section on a page. */
  defaultOpen?: boolean;
};

/**
 * Native <details>/<summary> so long educational content stays fully in the DOM
 * (crawlable, no JS required to read) while collapsed by default — cuts vertical
 * length on calculator pages without removing any content.
 */
export function CollapsibleArticleSection({ title, children, defaultOpen = false }: Props) {
  return (
    <details
      className="group rounded-xl border border-border bg-surface p-5 open:pb-5 [&_summary::-webkit-details-marker]:hidden"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xl font-semibold text-foreground">
        {title}
        <span className="shrink-0 text-foreground-muted transition-transform duration-200 group-open:rotate-180">
          ▾
        </span>
      </summary>
      <div className="mt-4 space-y-4">{children}</div>
    </details>
  );
}
