import { ROUTES } from "@/lib/routes";

/** Two guide URLs tuned by LPA band — adds differentiation across otherwise similar /lpa/ pages. */
export function getLpaBandGuideDeepLinks(lpa: number): { href: string; label: string; hint: string }[] {
  if (lpa <= 12) {
    return [
      {
        href: `${ROUTES.salaryGuides}/how-rent-changes-your-monthly-savings`,
        label: "How rent changes your monthly savings",
        hint: "At lower gross, rent is usually the first lever that swallows savings.",
      },
      {
        href: `${ROUTES.salaryGuides}/what-affects-in-hand-salary`,
        label: "What affects in-hand salary",
        hint: "PF, PT, and regime still move the needle before you spend a rupee on rent.",
      },
    ];
  }
  if (lpa <= 18) {
    return [
      {
        href: `${ROUTES.salaryGuides}/how-to-judge-if-a-salary-is-good-in-india`,
        label: "How to judge if a salary is good (framework)",
        hint: "Mid-band offers need a household + rent checklist, not just LPA envy.",
      },
      {
        href: `${ROUTES.taxGuides}/old-vs-new-tax-regime-basics`,
        label: "Old vs new tax regime basics",
        hint: "Deductions can flip which regime wins — don’t assume from this page’s new-regime default.",
      },
    ];
  }
  return [
    {
      href: `${ROUTES.salaryGuides}/how-rent-changes-your-monthly-savings`,
      label: "How rent changes your monthly savings",
      hint: "Higher gross doesn’t auto-fix savings if rent tracks peer lifestyle.",
    },
    {
      href: `${ROUTES.salaryGuides}/salary-structure-in-india`,
      label: "Salary structure in India (CTC vs in-hand)",
      hint: "Senior offers hide structure risk — variable pay and allowances matter for cash predictability.",
    },
  ];
}
