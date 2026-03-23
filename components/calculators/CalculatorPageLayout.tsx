import type { ReactNode } from "react";
import { Container, Section } from "@/components/ui";
import { CalculatorEducationLinks } from "@/components/content/CalculatorEducationLinks";
import type { CalculatorSlug } from "@/lib/routes";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { DisclaimerBlock } from "@/components/calculators/DisclaimerBlock";
import { AdSlot } from "@/components/ads/AdSlot";
import { CalculatorAccuracyCard } from "@/components/trust/CalculatorAccuracyCard";
import { CalculatorEstimateCaveats } from "@/components/trust/CalculatorEstimateCaveats";
import { FreshnessBadges } from "@/components/trust/FreshnessBadges";
import { MethodologyLink } from "@/components/trust/MethodologyLink";

type Props = {
  slug: CalculatorSlug;
  title: string;
  intro: string;
  children: ReactNode;
  /** When false, hides related + disclaimer (rare) */
  showFooterBlocks?: boolean;
};

/**
 * Shared shell: H1, intro, main content, related calculators, disclaimer.
 */
export function CalculatorPageLayout({
  slug,
  title,
  intro,
  children,
  showFooterBlocks = true,
}: Props) {
  return (
    <div className="flex flex-1 flex-col">
      <Section className="pt-8 sm:pt-12">
        <Container className="max-w-3xl space-y-8">
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {title}
            </h1>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {intro}
            </p>
            <FreshnessBadges />
            <MethodologyLink />
            <CalculatorAccuracyCard slug={slug} />
          </header>
          <AdSlot position="below-hero" label="Advertisement" className="scroll-mt-24" />
          {children}
          <AdSlot position="below-result" label="Advertisement" className="scroll-mt-28" />
          {showFooterBlocks ? (
            <>
              <AdSlot position="before-footer" label="Advertisement" />
              <div className="space-y-8 border-t border-zinc-200 pt-10 dark:border-zinc-800">
                <CalculatorEstimateCaveats slug={slug} />
                <CalculatorEducationLinks slug={slug} />
                <RelatedCalculators currentSlug={slug} />
                <DisclaimerBlock />
              </div>
            </>
          ) : null}
        </Container>
      </Section>
    </div>
  );
}
