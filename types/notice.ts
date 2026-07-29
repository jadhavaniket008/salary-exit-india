/** What the monthly amount represents — informational, doesn't change the arithmetic. */
export type NoticeSalaryBasis = "gross" | "basic" | "custom";

/** How the daily rate's divisor is determined. */
export type NoticeDayCountMethod = "calendar" | "fixed30" | "workingDays" | "custom";

export type NoticeBuyoutInput = {
  /** Monthly amount, as defined by salaryBasis (gross by default) */
  grossMonthlySalary: number;
  /** Notice days owed */
  noticeDays: number;
  /** Calendar month for day count (1–12) — required when dayCountMethod is "calendar" (the default) */
  month: number;
  /** Year (e.g. 2025) for day count — required when dayCountMethod is "calendar" */
  year: number;
  /** What grossMonthlySalary actually represents. Default "gross". */
  salaryBasis?: NoticeSalaryBasis;
  /** Divisor method. Default "calendar" (existing behavior — actual days in the chosen month). */
  dayCountMethod?: NoticeDayCountMethod;
  /** Required when dayCountMethod is "workingDays" */
  workingDaysInMonth?: number;
  /** Required when dayCountMethod is "custom" */
  customDivisor?: number;
};

export type NoticeBuyoutOutput = {
  buyoutAmount: number;
  /** The divisor actually used — calendar days, 30, working days, or custom, depending on dayCountMethod */
  daysInMonth: number;
  dailyRate: number;
  warnings: string[];
};
