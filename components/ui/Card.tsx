import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "raised";
}

export function Card({
  className = "",
  variant = "default",
  ...props
}: CardProps) {
  const variants = {
    default: "bg-surface border border-border rounded-xl shadow-sm",
    subtle:  "bg-surface-subtle border border-border rounded-xl",
    raised:  "bg-surface border border-border rounded-xl shadow-md",
  };

  return (
    <div className={`${variants[variant]} ${className}`} {...props} />
  );
}
