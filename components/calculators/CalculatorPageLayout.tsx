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
import { CalculatorEditorial } from "@/components/calculators/CalculatorEditorial";
import { JsonLd } from "@/components/content/JsonLd";
import { webApplicationJsonLd, breadcrumbJsonLd } from "@/lib/seo/structured-data";
import { MethodologyLink } from "@/components/trust/MethodologyLink";
import {
  ENGINE_FY_LABEL,
  SITE_CONTENT_LAST_UPDATED,
} from "@/lib/config/site-freshness";

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

      {/* ── Compact page header ─────────────────────────────────────── */}
      <div className="border-b border-border bg-surface">
        <Container className="max-w-3xl py-6 sm:py-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-base leading-relaxed text-foreground-secondary">
            {intro}
          </p>
          <p className="mt-3 text-xs text-foreground-muted">
            Reviewed {SITE_CONTENT_LAST_UPDATED} · {ENGINE_FY_LABEL} ·{" "}
            <MethodologyLink inline />
          </p>
        </Container>
      </div>

      {/* ── Calculator (first thing the user sees) ───────────────────── */}
      <section className="py-8 sm:py-10">
        <Container className="max-w-3xl space-y-8">

          {/* Ad slot — after header, before form (acceptable position) */}
          <AdSlot position="below-hero" label="Advertisement" />
          <EzoicAdSlot id={101} />

          {/* THE FORM — above all disclaimers */}
          {children}

          {/* Ad slot after result */}
          <AdSlot position="below-result" label="Advertisement" />
          <EzoicAdSlot id={102} />

          {/* ── Disclosures below the result ──────────────────────── */}
          {showFooterBlocks ? (
            <div className="space-y-8 border-t border-border pt-10">
              {/* Accuracy card — now a disclosure, not a gatekeeper */}
              <CalculatorAccuracyCard slug={slug} />
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
