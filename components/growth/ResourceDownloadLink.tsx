"use client";

import type { ReactNode } from "react";
import { trackResourceDownload } from "@/lib/analytics/client";

export function ResourceDownloadLink({ format, className, children }: {
  format: "csv" | "json"; className?: string; children: ReactNode;
}) {
  return <a href={`/data/salaryexit-in-hand-model-2026.${format}`} download className={className}
    onClick={() => trackResourceDownload(format)}>{children}</a>;
}
