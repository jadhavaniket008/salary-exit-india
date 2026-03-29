import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { FreshnessBadges } from "@/components/trust/FreshnessBadges";
import { TrustMethodologyNotice } from "@/components/trust/TrustMethodologyNotice";
import { CALCULATOR_REGISTRY } from "@/lib/calculator-registry";
import { ROUTES } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(
  {
    title: "Calculators hub",
    description:
      "India salary, tax regime, PF, HRA, gratuity, leave encashment, notice buyout, final settlement, offer comparison, and hike calculators — powered by a centralized engine.",
    keywords: [
      "India salary calculator",
      "CTC to in-hand",
      "old vs new tax regime",
      "HRA exemption",
      "EPF",
    ],
  },
  { canonicalPath: ROUTES.calculators }
);

export default function CalculatorsHubPage() {
  const items = Object.values(CALCULATOR_REGISTRY).sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  return (
    <Section className="pt-8 sm:pt-12">
      <Container className="max-w-5xl space-y-8">
        <header className="max-w-2xl space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Calculators
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Each page uses the same core calculation code with explicit assumptions, validation, and estimate labeling.
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Prefer reading first? Start with the{" "}
            <Link className="font-medium underline" href={ROUTES.salaryGuides}>
              salary guides
            </Link>
            ,{" "}
            <Link className="font-medium underline" href={ROUTES.taxGuides}>
              tax guides
            </Link>
            , or{" "}
            <Link className="font-medium underline" href={ROUTES.jobSwitchGuides}>
              job switch guides
            </Link>
            . For formula scope and FY assumptions, see{" "}
            <Link className="font-medium underline" href={ROUTES.methodology}>
              methodology
            </Link>
            .
          </p>
          <FreshnessBadges />
          <TrustMethodologyNotice variant="compact" />
        </header>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <li key={c.slug}>
              <Link
                href={c.path}
                className="block h-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
              >
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {c.label}
                </p>
                <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {c.seo.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
