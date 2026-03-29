import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";
import { AdPlaceholder } from "@/components/content/AdPlaceholder";
import { BreadcrumbNav } from "@/components/content/BreadcrumbNav";
import { FreshnessBadges } from "@/components/trust/FreshnessBadges";
import { TrustMethodologyNotice } from "@/components/trust/TrustMethodologyNotice";
import { LPA_LANDING_PAGES } from "@/lib/content/lpa-pages.config";
import { SALARY_ENOUGH_PAGES } from "@/lib/content/salary-enough-pages.config";
import { GUIDE_HUBS, GUIDE_ARTICLES, guideArticlePath } from "@/lib/content/guides-registry";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";
import { lpaLandingPath, salaryEnoughPath } from "@/lib/routes/landing-routes";

export const metadata: Metadata = buildPageMetadata(GUIDE_HUBS.salary.seo, {
  canonicalPath: ROUTES.salaryGuides,
});

export default function SalaryGuidesHubPage() {
  const articles = GUIDE_ARTICLES.filter((a) => a.hub === "salary");
  const popularLpa = LPA_LANDING_PAGES.slice(0, 4);

  return (
    <Section className="pt-6 sm:pt-10">
      <Container className="max-w-3xl space-y-10">
        <BreadcrumbNav
          items={[
            { label: "Home", href: ROUTES.home },
            { label: "Salary guides", href: ROUTES.salaryGuides },
          ]}
        />

        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {GUIDE_HUBS.salary.title}
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {GUIDE_HUBS.salary.description}
          </p>
          <FreshnessBadges />
          <TrustMethodologyNotice variant="compact" />
        </header>

        <AdPlaceholder />

        <section aria-labelledby="articles-heading" className="space-y-4">
          <h2 id="articles-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Core guides
          </h2>
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
        </section>

        <section aria-labelledby="lpa-heading" className="space-y-4">
          <h2 id="lpa-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Popular in-hand salary pages
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Scenario-based estimates with explicit assumptions — we expand coverage by adding new LPA scenarios to our
            content catalogue as we publish them.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {popularLpa.map((p) => (
              <li key={p.slug}>
                <Link
                  href={lpaLandingPath(p.slug)}
                  className="block rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
                >
                  ₹{p.lpa} LPA in-hand (estimate)
                </Link>
              </li>
            ))}
          </ul>
          <Link href={ROUTES.ctcToInHandCalculator} className="text-sm font-medium underline">
            Open the full CTC → in-hand calculator
          </Link>
        </section>

        <section aria-labelledby="enough-heading" className="space-y-4">
          <h2 id="enough-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Is this salary enough? (city + rent)
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Decision-intent pages with a clear answer, realistic rent assumptions, and an embedded{" "}
            <Link href={ROUTES.salaryRealityCheck} className="font-medium underline">
              Salary Reality Check
            </Link>
            . More city and salary combinations are added over time as we publish them.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {SALARY_ENOUGH_PAGES.map((p) => (
              <li key={p.slug}>
                <Link
                  href={salaryEnoughPath(p.slug)}
                  className="block rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
                >
                  {p.seo.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/40">
          <p className="font-medium text-zinc-900 dark:text-zinc-100">Related hubs</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link className="underline" href={ROUTES.taxGuides}>
                Tax guides
              </Link>
            </li>
            <li>
              <Link className="underline" href={ROUTES.jobSwitchGuides}>
                Job switch & exit guides
              </Link>
            </li>
            <li>
              <Link className="underline" href={ROUTES.calculators}>
                Calculators hub
              </Link>
            </li>
          </ul>
        </section>
      </Container>
    </Section>
  );
}
