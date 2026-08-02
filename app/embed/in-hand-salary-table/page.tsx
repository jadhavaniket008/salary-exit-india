import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";
import { generateInHandSalaryModel } from "@/lib/growth/in-hand-salary-model";
import { InHandModelTable } from "@/components/growth/InHandModelTable";
import { CopyIframeSnippet } from "@/components/growth/CopyIframeSnippet";

/**
 * Publisher-ready, chrome-free embed of the flagship report's table.
 * Deliberately lives OUTSIDE the app/(site) route group, so it does not
 * inherit SiteHeader, SiteFooter, the cookie-consent banner, GA4/Plausible,
 * or the sticky mobile CTA — those all live in app/(site)/layout.tsx. This
 * page only gets the minimal true-root layout (app/layout.tsx: <html>,
 * fonts, global CSS, and the sitewide WebSite/Organization JSON-LD).
 *
 * One disclosed limitation: if NEXT_PUBLIC_ADSENSE_CLIENT_ID is set, the
 * AdSense verification <script> still loads here too, because it must live
 * in the true root layout's server-rendered <head> for Google's checker
 * (documented in app/layout.tsx) — Next.js doesn't support per-route <head>
 * scripts outside the root layout, and moving it to a client-injected
 * strategy was already rejected sitewide for the same reason. No ad slots,
 * no cookie banner, and no analytics render on this page regardless.
 *
 * noindex, follow — matches the site's existing salary-enough-pages.config.ts
 * pattern for pages deliberately kept out of search results without cutting
 * off crawl discovery of what they link to.
 */
export const metadata: Metadata = {
  ...buildPageMetadata(
    {
      title: "Embed: In-Hand Salary Table (FY 2026-27) — SalaryExit",
      description:
        "Free, no-tracking, chrome-free embeddable table: CTC to in-hand salary across employer-cost and PF scenarios, from SalaryExit's In-Hand Salary Model 2026.",
    },
    { canonicalPath: ROUTES.inHandSalaryTableEmbed }
  ),
  robots: { index: false, follow: true },
};

const REPORT_PUBLISHED_ISO = "2026-07-31";
const RECOMMENDED_IFRAME_HEIGHT = 640;

export default function InHandSalaryTableEmbedPage() {
  const model = generateInHandSalaryModel(REPORT_PUBLISHED_ISO + "T00:00:00.000Z");
  const embedUrl = absoluteUrl(ROUTES.inHandSalaryTableEmbed);
  const iframeSnippet = `<iframe src="${embedUrl}" title="SalaryExit India — In-Hand Salary Table" width="100%" height="${RECOMMENDED_IFRAME_HEIGHT}" style="border:0;max-width:720px" loading="lazy"></iframe>`;

  return (
    <main className="mx-auto w-full max-w-[720px] space-y-5 px-4 py-6 sm:px-6">
      <header className="space-y-1.5">
        <h1 className="text-lg font-semibold text-foreground sm:text-xl">
          In-hand salary table ({model.assumptions.financialYearLabel})
        </h1>
        <p className="text-xs leading-relaxed text-foreground-secondary">
          Modeled CTC-to-in-hand figures across employer-cost and PF scenarios — generated live from
          SalaryExit&rsquo;s tax/PF engine, not a static image. New regime, {Math.round(
            model.assumptions.basicDaShareOfGross * 100
          )}% Basic+DA assumption, ₹{model.assumptions.professionalTaxAnnual.toLocaleString("en-IN")}
          /year professional tax.
        </p>
      </header>

      <InHandModelTable
        rows={model.salaryLevelRows}
        employerCostShareScenarios={model.assumptions.employerCostShareScenarios}
      />

      <footer className="space-y-4 border-t border-border pt-4">
        <p className="text-xs text-foreground-muted">
          <span className="font-medium text-foreground">SalaryExit India</span> — source:{" "}
          <Link href={ROUTES.inHandSalaryModelReport} className="underline">
            In-Hand Salary Model 2026 (full methodology, CSV/JSON download)
          </Link>
          . Free to embed with attribution, no cost, no exclusivity, no followed-link requirement.
        </p>

        <details className="rounded-lg border border-border bg-surface-subtle p-3">
          <summary className="cursor-pointer text-xs font-medium text-foreground">
            Embed this table on your site
          </summary>
          <div className="mt-3 space-y-2">
            <p className="text-xs text-foreground-secondary">
              Paste this snippet where you want the table to appear. Recommended height:{" "}
              {RECOMMENDED_IFRAME_HEIGHT}px (adjust if your layout needs more/less room — the table
              scrolls internally on narrow screens, so a taller iframe isn&rsquo;t required for mobile).
            </p>
            <CopyIframeSnippet snippet={iframeSnippet} />
          </div>
        </details>
      </footer>
    </main>
  );
}
