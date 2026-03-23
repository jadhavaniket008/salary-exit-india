export function DisclaimerBlock() {
  return (
    <aside
      className="rounded-xl border border-zinc-200 bg-white p-4 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
      role="note"
    >
      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
        Disclaimer
      </p>
      <p className="mt-2">
        SalaryExit India provides <strong>estimates</strong> for education and planning. Outputs are{" "}
        <strong>not</strong> tax filing advice, payroll advice, legal advice, or employer-official figures.
      </p>
      <ul className="mt-3 list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
        <li>
          Tax math uses configured FY slabs and a simplified Section 87A model — <strong>no surcharge</strong>,{" "}
          <strong>no marginal relief</strong>, and limited Chapter VI-A detail depending on the tool.
        </li>
        <li>
          PF, professional tax, HRA, notice buyouts, and settlements depend on state law and company policy —
          replace placeholders with your numbers where possible.
        </li>
        <li>Slabs and limits change with the Budget — confirm the financial year in-app before relying on numbers.</li>
      </ul>
      <p className="mt-3">
        Verify with a qualified CA, payroll, or legal professional before decisions that affect tax filing,
        employment, or compensation.
      </p>
    </aside>
  );
}
