import { AFFILIATE_LINKS, type AffiliateContext } from "@/lib/content/affiliate-links";

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
      className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {HEADING[context]}
          </h2>
          <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{SUBTEXT[context]}</p>
        </div>
        <span className="shrink-0 rounded-full border border-zinc-300/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
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
            className="group flex flex-col justify-between gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">{link.name}</span>
                {link.badge && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                    {link.badge}
                  </span>
                )}
              </div>
              <p className="text-sm leading-snug text-zinc-600 dark:text-zinc-400">{link.tagline}</p>
            </div>
            <span className="text-sm font-medium text-zinc-800 underline-offset-2 group-hover:underline dark:text-zinc-200">
              {link.cta} →
            </span>
          </a>
        ))}
      </div>

      <p className="text-[11px] leading-relaxed text-zinc-400 dark:text-zinc-500">
        These are partner links. Clicking them may earn SalaryExit a small referral fee at no cost to you.
        We only link to services we can stand behind. This is not financial advice — verify suitability yourself.
      </p>
    </aside>
  );
}
