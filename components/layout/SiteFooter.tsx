import Link from "next/link";
import { Container } from "@/components/ui";
import { ROUTES } from "@/lib/routes";

const legal = [
  { href: ROUTES.about, label: "About" },
  { href: ROUTES.contact, label: "Contact" },
  { href: ROUTES.privacyPolicy, label: "Privacy policy" },
  { href: ROUTES.terms, label: "Terms of use" },
  { href: ROUTES.disclaimer, label: "Disclaimer" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white/80 py-10 dark:border-zinc-800 dark:bg-zinc-950/80">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md space-y-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">SalaryExit India</p>
          <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            Educational salary and tax estimates for India. Not a law firm, CA practice, or registered
            investment adviser. Calculators are indicative — verify with professionals and official documents.
          </p>
        </div>
        <nav aria-label="Legal and site" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href={ROUTES.calculators} className="text-zinc-700 hover:underline dark:text-zinc-300">
            Calculators
          </Link>
          <Link href={ROUTES.methodology} className="text-zinc-700 hover:underline dark:text-zinc-300">
            Methodology
          </Link>
          <Link href={ROUTES.salaryGuides} className="text-zinc-700 hover:underline dark:text-zinc-300">
            Salary guides
          </Link>
          <Link href={ROUTES.taxGuides} className="text-zinc-700 hover:underline dark:text-zinc-300">
            Tax guides
          </Link>
          <Link href={ROUTES.jobSwitchGuides} className="text-zinc-700 hover:underline dark:text-zinc-300">
            Job switch guides
          </Link>
          {legal.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-700 hover:underline dark:text-zinc-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="mt-8 border-t border-zinc-200/80 pt-6 text-center text-[11px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        © {new Date().getFullYear()} SalaryExit India. All rights reserved.
      </Container>
    </footer>
  );
}
