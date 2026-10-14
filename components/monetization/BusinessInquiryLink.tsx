"use client";

import type { ReactNode } from "react";
import { trackBusinessInquiry } from "@/lib/analytics/client";

export function BusinessInquiryLink({ email, placement, className, children }: {
  email: string; placement: "business_hero" | "business_footer"; className?: string; children: ReactNode;
}) {
  const subject = encodeURIComponent("SalaryExit supported embed pilot");
  const body = encodeURIComponent("Company / website:\nUse case and audience:\nPage to embed on:\nApproximate monthly visitors:\nSetup or support needed:\nTarget launch date:\n");
  return <a href={`mailto:${email}?subject=${subject}&body=${body}`} className={className}
    onClick={() => trackBusinessInquiry(placement)}>{children}</a>;
}
