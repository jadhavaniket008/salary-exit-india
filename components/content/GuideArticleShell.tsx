import type { ReactNode } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import { BreadcrumbNav } from "@/components/content/BreadcrumbNav";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/components/content/JsonLd";
import { articleJsonLd, faqPageJsonLd, type FaqJsonLdItem } from "@/lib/jsonld";
import { DisclaimerBlock } from "@/components/calculators/DisclaimerBlock";
import { FaqSection } from "@/components/calculators/FaqSection";
import type { FaqItem } from "@/types/faq";
import { ROUTES } from "@/lib/routes";
import type { GuideHubId } from "@/lib/content/guides-registry";
import { getGuideClusterLinks } from "@/lib/content/guide-cluster-links";
import { getSalaryEnoughPageConfig } from "@/lib/content/salary-enough-pages.config";
import { salaryEnoughPath } from "@/lib/routes/landing-routes";

type Props = {
  title: string;
  intro: string;
  breadcrumbs: BreadcrumbItem[];
  urlPath: string;
  description: string;
  children: ReactNode;
  faq?: FaqItem[];
  showMidAd?: boolean;
  /** Shown under the intro — e.g. "22 March 2025" */
  lastUpdated?: string;
  /** ISO date for <time> when lastUpdated is set */
  lastUpdatedIso?: string;
  /** Set to false to hide methodology link */
  methodologyHref?: string | false;
  /** Enables contextual links to salary-enough pages + one calculator (internal linking cluster). */
  guideCluster?: { hub: GuideHubId; segment: string };
};

export function GuideArticleShell({
  title,
  intro,
  breadcrumbs,
  urlPath,
  description,
  children,
  faq,
  showMidAd = true,
  lastUpdated,
  lastUpdatedIso,
  methodologyHref,
  guideCluster,
}: Props) {
  const clusterSpec = guideCluster ? getGuideClusterLinks(guideCluster.hub, guideCluster.segment) : undefined;
  const clusterEnough =
    clusterSpec?.salaryEnoughSlugs
      .map((slug) => {
        const c = getSalaryEnoughPageConfig(slug);
        return c ? { slug, title: c.seo.title, city: c.city.name } : null;
      })
      .filter((x): x is NonNullable<typeof x> => Boolean(x)) ?? [];

  const faqLd: FaqJsonLdItem[] | null =
    faq && faq.length > 0
      ? faq.map((f) => ({ question: f.question, answer: f.answer }))
      : null;

  return (
    <div className="flex flex-1 flex-col">
      <JsonLd
        data={articleJsonLd({
          headline: title,
          description,
          urlPath,
        })}
      />
      {faqLd ? <JsonLd data={faqPageJsonLd(faqLd)} /> : null}

      <Section className="pt-6 sm:pt-10">
        <Container className="max-w-3xl space-y-8">
          <BreadcrumbNav items={breadcrumbs} />
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {title}
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400">{intro}</p>
            {(lastUpdated || methodologyHref !== false) && (
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-zinc-200 pb-6 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                {lastUpdated ? (
                  <span>
                    Last updated:{" "}
                    <time dateTime={lastUpdatedIso ?? undefined} className="text-zinc-700 dark:text-zinc-300">
                      {lastUpdated}
                    </time>
                  </span>
                ) : null}
                {methodologyHref !== false ? (
                  <Link
                    href={methodologyHref ?? ROUTES.methodology}
                    className="font-medium text-zinc-800 underline underline-offset-2 dark:text-zinc-200"
                  >
                    Methodology & calculator assumptions
                  </Link>
                ) : null}
              </div>
            )}
          </header>

          <AdSlot position="below-hero" label="Advertisement" />

          {children}

          {clusterSpec && clusterEnough.length >= 2 ? (
            <section
              aria-labelledby="guide-cluster-links-heading"
              className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <h2
                id="guide-cluster-links-heading"
                className="text-base font-semibold text-zinc-900 dark:text-zinc-50"
              >
                Put it in context: city rent + one calculator
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{clusterSpec.intro}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                “Is this salary enough?” scenarios
              </p>
              <ul className="mt-2 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                {clusterEnough.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={salaryEnoughPath(item.slug)}
                      className="font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-100"
                    >
                      {item.title}
                    </Link>
                    <span className="text-zinc-500 dark:text-zinc-400"> · {item.city}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm">
                <Link
                  href={clusterSpec.calculatorHref}
                  className="font-semibold text-zinc-900 underline underline-offset-2 dark:text-zinc-100"
                >
                  {clusterSpec.calculatorLabel}
                </Link>
                <span className="text-zinc-600 dark:text-zinc-400"> — same engines as the rest of SalaryExit.</span>
              </p>
            </section>
          ) : null}

          {showMidAd ? <AdSlot position="mid-content" label="Advertisement" className="my-4" /> : null}

          {faq && faq.length > 0 ? (
            <FaqSection items={faq} />
          ) : null}

          <AdSlot position="before-footer" label="Advertisement" />

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/40">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">Keep exploring</p>
            <ul className="mt-2 space-y-1 text-zinc-700 dark:text-zinc-300">
              <li>
                <Link className="underline" href="/calculators">
                  Browse all calculators
                </Link>
              </li>
              <li>
                <Link className="underline" href="/salary-guides">
                  Salary guides hub
                </Link>
              </li>
              <li>
                <Link className="underline" href="/tax-guides">
                  Tax guides hub
                </Link>
              </li>
              <li>
                <Link className="underline" href="/job-switch-guides">
                  Job switch & exit guides
                </Link>
              </li>
            </ul>
          </div>

          <DisclaimerBlock />
        </Container>
      </Section>
    </div>
  );
}
