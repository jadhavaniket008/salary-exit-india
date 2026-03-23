/**
 * Leave encashment — estimate only; tax treatment is employer/policy specific.
 */

/** Divisor for deriving "per day" pay from monthly Basic+DA. */
export type LeaveEncashmentDayBasis = 26 | 30;

export type LeaveEncashmentInput = {
  /** Monthly Basic + DA (typical payroll base for encashment) */
  basicAndDaMonthly: number;
  /** Leave balance eligible for encashment (days) */
  unusedLeaveDays: number;
  /** 26 mirrors many Indian payroll "per day" rates; 30 uses calendar-day style */
  dayBasis: LeaveEncashmentDayBasis;
};

export type LeaveEncashmentOutput = {
  dailyRate: number;
  encashmentAmount: number;
  warnings: string[];
};
