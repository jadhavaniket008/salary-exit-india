import type { FaqItem } from "@/types/faq";

export const HOME_FAQ: FaqItem[] = [
  {
    question: "Are SalaryExit numbers exact?",
    answer:
      "No. They are transparent estimates from a versioned calculation engine with stated assumptions (financial year settings, simplified rebates, no surcharge, etc.). Payslips and Form 16 remain authoritative.",
  },
  {
    question: "Is this tax filing advice?",
    answer:
      "No. SalaryExit is for education and planning. For filing, use official documents and a qualified professional.",
  },
  {
    question: "Why does the same CTC produce different in-hand numbers across websites?",
    answer:
      "Because PF wage, PT state, regime choice, perquisites, and TDS smoothing differ. We publish assumptions so you can reconcile differences intentionally.",
  },
];
