import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

/**
 * Server-rendered, always visible — this previously used Framer Motion's
 * whileInView with initial opacity 0, meaning the section was genuinely
 * invisible in server-rendered HTML (and to screenshot tools, crawlers, and
 * any user whose JS hasn't hydrated yet) until scrolled into view. Same bug
 * class as the homepage's AnimateIn wrapper, fixed the same way: render the
 * real content immediately instead of animating it in.
 */
export function WorkedExample({
  title = "Worked example (same engine as live calculator)",
  children,
}: Props) {
  return (
    <section
      aria-labelledby="worked-example-heading"
      className="rounded-xl border border-border bg-surface p-4"
    >
      <h2
        id="worked-example-heading"
        className="text-sm font-semibold text-foreground"
      >
        {title}
      </h2>
      <div className="mt-2 text-sm leading-relaxed text-foreground-secondary">
        {children}
      </div>
    </section>
  );
}
