import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const links = [
  { href: ROUTES.calculators, label: "Calculators" },
  { href: ROUTES.methodology, label: "Methodology" },
  { href: ROUTES.salaryGuides, label: "Salary guides" },
  { href: ROUTES.taxGuides, label: "Tax guides" },
  { href: ROUTES.jobSwitchGuides, label: "Job switch" },
  { href: ROUTES.ctcToInHandCalculator, label: "CTC → in-hand" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.home}
          className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          SalaryExit India
        </Link>
        <nav
          className="hidden flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400 md:flex"
          aria-label="Primary"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-800 dark:border-zinc-800 dark:text-zinc-100 [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-56 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
