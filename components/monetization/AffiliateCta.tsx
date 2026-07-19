"use client";

import { AFFILIATE_LINKS, type AffiliateContext } from "@/lib/content/affiliate-links";
import { trackAffiliateClick } from "@/lib/analytics/client";

const HEADING: Record<AffiliateContext, string> = {
  investing: "Put your savings to work",
  "tax-filing": "Ready to file your ITR?",
};

const SUBTEXT: Record<AffiliateContext, string> = {
  investing: "Services worth exploring once you know your in-hand number.",
  "tax-filing": "File using the regime the calculator just recommended.",
};

interface Props {
  context: AffiliateContext;
}

export function AffiliateCta({ context }: Props) {
  const enabled = process.env.NEXT_PUBLIC_ENABLE_AFFILIATE_LINKS === "true";
  if (!enabled) return null;

  const links = AFFILIATE_LINKS[context];
  if (!links?.length) return null;

  return (
    <aside
      aria-label="Explore related services"
      className="space-y-4 rounded-xl border border-border bg-surface-subtle p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            {HEADING[context]}
          </h2>
          <p className="mt-0.5 text-sm text-foreground-secondary">{SUBTEXT[context]}</p>
        </div>
        <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground-muted">
          Partner links
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            onClick={() => trackAffiliateClick(link.name, context)}
            className="group flex flex-col justify-between gap-3 rounded-xl border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{link.name}</span>
                {link.badge && (
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                    {link.badge}
                  </span>
                )}
              </div>
              <p className="text-sm leading-snug text-foreground-secondary">{link.tagline}</p>
            </div>
            <span className="text-sm font-medium text-foreground underline-offset-2 group-hover:underline">
              {link.cta} →
            </span>
          </a>
        ))}
      </div>

      <p className="text-[11px] leading-relaxed text-foreground-muted">
        These are partner links. Clicking them may earn SalaryExit a small referral fee at no cost to you.
        We only link to services we can stand behind. This is not financial advice — verify suitability yourself.
      </p>
    </aside>
  );
}
