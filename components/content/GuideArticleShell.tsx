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
}: Props) {
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
