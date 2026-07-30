import Link from "next/link";
import { Container } from "@/components/ui";
import { ROUTES } from "@/lib/routes";
import { SupportLink } from "@/components/monetization/SupportLink";

/**
 * Curated subset, not the full 13-calculator directory — keeps the footer
 * scannable. The complete list lives at ROUTES.calculators; a link to it
 * follows this list wherever it's rendered. Reverse salary, leave encashment,
 * and salary hike are included deliberately so they stay discoverable from
 * every page without requiring a visit to the hub.
 */
const popularCalculatorLinks = [
  { href: ROUTES.ctcToInHandCalculator, label: "CTC to in-hand" },
  { href: ROUTES.reverseSalaryCalculator, label: "Required CTC (reverse salary)" },
  { href: ROUTES.salaryCalculator, label: "Salary breakdown" },
  { href: ROUTES.oldVsNewTaxRegimeCalculator, label: "Tax regime comparison" },
  { href: ROUTES.salaryRealityCheck, label: "Salary Reality Check" },
  { href: ROUTES.leaveEncashmentCalculator, label: "Leave encashment" },
  { href: ROUTES.salaryHikeCalculator, label: "Salary hike" },
];

const guideLinks = [
  { href: ROUTES.salaryGuides, label: "Salary guides" },
  { href: ROUTES.taxGuides, label: "Tax guides" },
  { href: ROUTES.jobSwitchGuides, label: "Job switch guides" },
];

const companyLinks = [
  { href: ROUTES.methodology, label: "Methodology" },
  { href: ROUTES.about, label: "About" },
  { href: ROUTES.contact, label: "Contact" },
  { href: ROUTES.forBusinesses, label: "For businesses" },
];

const legalLinks = [
  { href: ROUTES.privacyPolicy, label: "Privacy policy" },
  { href: ROUTES.terms, label: "Terms of use" },
  { href: ROUTES.disclaimer, label: "Disclaimer" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-solid text-white text-xs font-bold">₹</span>
              <span className="text-sm font-semibold text-foreground">SalaryExit India</span>
            </div>
            <p className="text-xs leading-relaxed text-foreground-secondary">
              Educational salary and tax estimates for Indian salaried employees.
              Not tax advice — verify with your CA and Form 16.
            </p>
            <p className="mt-3 text-xs text-foreground-muted">
              FY 2026–27 engine · Estimates only
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground-muted">
              Popular calculators
            </h3>
            <ul className="space-y-2">
              {popularCalculatorLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={ROUTES.calculators}
                  className="text-sm font-medium text-foreground hover:text-accent-solid transition-colors"
                >
                  All calculators →
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground-muted">
              Guides
            </h3>
            <ul className="space-y-2">
              {guideLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-foreground-muted">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <SupportLink />
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground-muted">
              Legal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-border bg-surface-subtle p-4">
              <p className="text-xs leading-relaxed text-foreground-secondary">
                <strong className="text-foreground">Not a CA, law firm, or filing tool.</strong>{" "}
                Read the full{" "}
                <Link href={ROUTES.disclaimer} className="underline hover:text-foreground">
                  disclaimer
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-foreground-muted">
            © {new Date().getFullYear()} SalaryExit India. All rights reserved.
          </p>
          <p className="text-xs text-foreground-muted">
            Estimates · Not tax advice · FY 2026–27
          </p>
        </Container>
      </div>
    </footer>
  );
}
