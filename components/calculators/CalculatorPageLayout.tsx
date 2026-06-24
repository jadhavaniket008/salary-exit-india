import type { ReactNode } from "react";
import { Container } from "@/components/ui";
import { CalculatorEducationLinks } from "@/components/content/CalculatorEducationLinks";
import { ROUTES, type CalculatorSlug } from "@/lib/routes";
import { CALCULATOR_REGISTRY } from "@/lib/calculator-registry";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { DisclaimerBlock } from "@/components/calculators/DisclaimerBlock";
import { AdSlot } from "@/components/ads/AdSlot";
import { EzoicAdSlot } from "@/components/ads/EzoicAdSlot";
import { CalculatorAccuracyCard } from "@/components/trust/CalculatorAccuracyCard";
import { CalculatorEstimateCaveats } from "@/components/trust/CalculatorEstimateCaveats";
import { FreshnessBadges } from "@/components/trust/FreshnessBadges";
import { MethodologyLink } from "@/components/trust/MethodologyLink";
import { CalculatorEditorial } from "@/components/calculators/CalculatorEditorial";
import { JsonLd } from "@/components/content/JsonLd";
import { webApplicationJsonLd, breadcrumbJsonLd } from "@/lib/seo/structured-data";

type Props = {
  slug: CalculatorSlug;
  title: string;
  intro: string;
  children: ReactNode;
  showFooterBlocks?: boolean;
};

export function CalculatorPageLayout({
  slug,
  title,
  intro,
  children,
  showFooterBlocks = true,
}: Props) {
  const urlPath = CALCULATOR_REGISTRY[slug]?.path ?? `/${slug}`;

  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={webApplicationJsonLd({ name: title, description: intro, urlPath })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: ROUTES.home },
          { name: "Calculators", path: ROUTES.calculators },
          { name: title, path: urlPath },
        ])}
      />

      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="border-b border-border bg-surface">
        <Container className="max-w-3xl py-8 sm:py-10">
          <header className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            <p className="text-base leading-relaxed text-foreground-secondary">
              {intro}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <FreshnessBadges />
              <MethodologyLink />
            </div>
          </header>
        </Container>
      </div>

      {/* ── Calculator body ──────────────────────────────────────────── */}
      <section className="py-8 sm:py-10">
        <Container className="max-w-3xl space-y-8">
          <CalculatorAccuracyCard slug={slug} />
          <AdSlot position="below-hero" label="Advertisement" />
          <EzoicAdSlot id={101} />

          {children}

          <AdSlot position="below-result" label="Advertisement" />
          <EzoicAdSlot id={102} />

          {showFooterBlocks ? (
            <div className="space-y-8 border-t border-border pt-10">
              <CalculatorEstimateCaveats slug={slug} />
              <CalculatorEditorial slug={slug} />
              <CalculatorEducationLinks slug={slug} />
              <RelatedCalculators currentSlug={slug} />
              <DisclaimerBlock />
            </div>
          ) : null}
        </Container>
      </section>
    </div>
  );
}
