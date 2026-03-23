import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export function MethodologyLink({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${className}`}>
      <Link href={ROUTES.methodology} className="font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-100">
        How SalaryExit calculates estimates
      </Link>{" "}
      (methodology, FY scope, and limits).
    </p>
  );
}
