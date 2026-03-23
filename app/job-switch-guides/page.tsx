import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";
import { AdPlaceholder } from "@/components/content/AdPlaceholder";
import { BreadcrumbNav } from "@/components/content/BreadcrumbNav";
import { FreshnessBadges } from "@/components/trust/FreshnessBadges";
import { TrustMethodologyNotice } from "@/components/trust/TrustMethodologyNotice";
import { GUIDE_ARTICLES, GUIDE_HUBS, guideArticlePath } from "@/lib/content/guides-registry";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildPageMetadata(GUIDE_HUBS.jobSwitch.seo, {
  canonicalPath: ROUTES.jobSwitchGuides,
});

export default function JobSwitchGuidesHubPage() {
  const articles = GUIDE_ARTICLES.filter((a) => a.hub === "jobSwitch");

  return (
    <Section className="pt-6 sm:pt-10">
      <Container className="max-w-3xl space-y-10">
        <BreadcrumbNav
          items={[
            { label: "Home", href: ROUTES.home },
            { label: "Job switch guides", href: ROUTES.jobSwitchGuides },
          ]}
        />

        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {GUIDE_HUBS.jobSwitch.title}
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {GUIDE_HUBS.jobSwitch.description}
          </p>
          <FreshnessBadges />
          <TrustMethodologyNotice variant="compact" />
        </header>

        <AdPlaceholder />

        <ul className="space-y-3">
          {articles.map((a) => (
            <li key={a.segment}>
              <Link
                href={guideArticlePath(a)}
                className="block rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
              >
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">{a.title}</span>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{a.description}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/40">
          <p className="font-medium text-zinc-900 dark:text-zinc-100">High-signal calculators</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link className="underline" href={ROUTES.offerComparisonCalculator}>
                Offer comparison
              </Link>
            </li>
            <li>
              <Link className="underline" href={ROUTES.noticePeriodBuyoutCalculator}>
                Notice buyout
              </Link>
            </li>
            <li>
              <Link className="underline" href={ROUTES.gratuityCalculator}>
                Gratuity
              </Link>
            </li>
            <li>
              <Link className="underline" href={ROUTES.methodology}>
                Methodology — FY scope and engine limits
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
