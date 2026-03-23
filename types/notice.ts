export type NoticeBuyoutInput = {
  /** Gross monthly salary used for buyout */
  grossMonthlySalary: number;
  /** Notice days owed */
  noticeDays: number;
  /** Calendar month for day count (1–12) */
  month: number;
  /** Year (e.g. 2025) for day count */
  year: number;
};

export type NoticeBuyoutOutput = {
  buyoutAmount: number;
  daysInMonth: number;
  dailyRate: number;
  warnings: string[];
};
