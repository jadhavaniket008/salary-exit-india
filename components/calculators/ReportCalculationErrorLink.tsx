type Props = {
  /** Calculator or page name shown in the prefilled email subject, e.g. "CTC to in-hand calculator" */
  toolName: string;
};

const FALLBACK_CONTACT_EMAIL = "hello@salaryexit.in";

/**
 * A user-reported error is the cheapest QA a small, solo-run site can run —
 * every calculator/guide page should carry this link so mistakes surface
 * instead of sitting unnoticed (see SalaryStructureIndiaBody ₹18L Basic
 * mislabeling and the CTC-vs-gross framing fix, both found by manual audit).
 */
export function ReportCalculationErrorLink({ toolName }: Props) {
  const email = (process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || FALLBACK_CONTACT_EMAIL);
  const subject = encodeURIComponent(`Calculation issue: ${toolName}`);
  const body = encodeURIComponent(
    `Tool: ${toolName}\n\nWhat I entered:\n\nWhat I expected:\n\nWhat I got instead:\n\n(Optional) Link to this page:\n`
  );

  return (
    <p className="text-sm text-foreground-secondary">
      Spotted a wrong number or confusing label?{" "}
      <a href={`mailto:${email}?subject=${subject}&body=${body}`} className="font-medium underline">
        Report a calculation error
      </a>{" "}
      — every report gets checked against the engine.
    </p>
  );
}
