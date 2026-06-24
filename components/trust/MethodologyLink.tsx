import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export function MethodologyLink({
  className = "",
  inline = false,
}: {
  className?: string;
  inline?: boolean;
}) {
  if (inline) {
    return (
      <Link
        href={ROUTES.methodology}
        className="text-foreground-secondary underline underline-offset-2 hover:text-foreground transition-colors"
      >
        Methodology
      </Link>
    );
  }
  return (
    <p className={`text-sm text-foreground-secondary ${className}`}>
      <Link
        href={ROUTES.methodology}
        className="font-medium text-foreground underline underline-offset-2 hover:text-accent transition-colors"
      >
        How SalaryExit calculates estimates
      </Link>{" "}
      (methodology, FY scope, and limits).
    </p>
  );
}
