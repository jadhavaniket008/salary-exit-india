import type { InputHTMLAttributes } from "react";

export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-xl border border-border-strong bg-surface-raised px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-foreground-muted transition-colors focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20 ${className}`}
      {...props}
    />
  );
}
