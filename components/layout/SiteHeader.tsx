import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const navLinks = [
  { href: ROUTES.calculators, label: "Calculators" },
  { href: ROUTES.salaryGuides, label: "Salary guides" },
  { href: ROUTES.taxGuides, label: "Tax guides" },
  { href: ROUTES.jobSwitchGuides, label: "Job switch" },
  { href: ROUTES.methodology, label: "Methodology" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={ROUTES.home}
          className="flex items-center gap-2 text-sm font-semibold text-foreground tracking-tight hover:text-accent transition-colors"
          aria-label="SalaryExit India — home"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white text-xs font-bold">
            ₹
          </span>
          <span>SalaryExit</span>
          <span className="hidden text-foreground-muted font-normal sm:inline">India</span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-foreground-secondary transition-colors hover:bg-surface-subtle hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + mobile menu */}
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.ctcToInHandCalculator}
            className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            Calculate in-hand
          </Link>

          <details className="relative md:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Menu
            </summary>
            <div className="absolute right-0 mt-2 w-60 rounded-xl border border-border bg-surface shadow-lg">
              <div className="p-2">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block rounded-lg px-3 py-2.5 text-sm text-foreground-secondary hover:bg-surface-subtle hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="mx-3 my-2 border-t border-border" />
                <Link
                  href={ROUTES.ctcToInHandCalculator}
                  className="block rounded-lg bg-accent px-3 py-2.5 text-center text-sm font-medium text-white"
                >
                  Calculate in-hand
                </Link>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
