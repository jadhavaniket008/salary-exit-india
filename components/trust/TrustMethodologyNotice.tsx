import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import {
  CALCULATIONS_POLICY_SYNC_LINE,
  ENGINE_FY_LABEL,
  SITE_CONTENT_LAST_UPDATED,
} from "@/lib/config/site-freshness";

type Props = {
  /** default = bordered callout; compact = one paragraph for sidebars/heroes */
  variant?: "default" | "compact";
  className?: string;
};

/**
 * Reusable editorial + methodology statement for launch trust — no badges, no fake credentials.
 * Update {@link SITE_CONTENT_LAST_UPDATED} / {@link ENGINE_FY_LABEL} in site-freshness when copy or FY scope changes.
 */
export function TrustMethodologyNotice({ variant = "default", className = "" }: Props) {
  const meta = (
    <span className="text-foreground-muted">
      {ENGINE_FY_LABEL}. Site content last reviewed: {SITE_CONTENT_LAST_UPDATED}. {CALCULATIONS_POLICY_SYNC_LINE}
    </span>
  );

  if (variant === "compact") {
    return (
      <p className={`text-sm leading-relaxed text-foreground-secondary ${className}`}>
        <strong className="font-semibold text-foreground">Editorial note.</strong> SalaryExit
        publishes educational estimates with stated assumptions — not tax filing advice, legal opinions, or
        employer-certified payroll. Read the{" "}
        <Link href={ROUTES.methodology} className="font-medium text-foreground underline">
          methodology
        </Link>{" "}
        and{" "}
        <Link href={ROUTES.disclaimer} className="font-medium text-foreground underline">
          disclaimer
        </Link>
        . {meta}
      </p>
    );
  }

  return (
    <aside
      className={`rounded-xl border border-border bg-surface-subtle p-4 text-sm leading-relaxed text-foreground-secondary ${className}`}
      aria-labelledby="trust-methodology-heading"
    >
      <h2 id="trust-methodology-heading" className="text-base font-semibold text-foreground">
        How to read numbers on this site
      </h2>
      <p className="mt-2">
        Calculators apply transparent formulas and config (tax slabs, PF rules, heuristics) that you can audit in
        code — outputs are <strong>indicative</strong> for planning and learning. We do not guarantee a match to
        your payslip, Form 16, or a qualified advisor's review.
      </p>
      <p className="mt-2">
        <Link href={ROUTES.methodology} className="font-medium text-foreground underline">
          Full methodology
        </Link>
        {" · "}
        <Link href={ROUTES.disclaimer} className="font-medium text-foreground underline">
          Disclaimer
        </Link>
        {" · "}
        <Link href={ROUTES.about} className="text-foreground-secondary underline">
          About
        </Link>
      </p>
      <p className="mt-3 text-xs text-foreground-muted">{meta}</p>
    </aside>
  );
}
