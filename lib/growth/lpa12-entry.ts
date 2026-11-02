/** Explicit gross-salary EXAMPLE only; never treat a quoted CTC as gross. */
export const LPA_12_GROSS_EXAMPLE_KEY = "12l-gross";
export const LPA_12_GROSS_EXAMPLE_HREF =
  "/ctc-to-in-hand-calculator?example=12l-gross";

export type SalaryExamplePrefill = Readonly<{
  annualGross: string;
  annualBasicDa: string;
}>;

export function resolveSalaryExamplePrefill(
  value: string | string[] | undefined,
): SalaryExamplePrefill | null {
  if (value !== LPA_12_GROSS_EXAMPLE_KEY) return null;
  return { annualGross: "1200000", annualBasicDa: "540000" };
}
