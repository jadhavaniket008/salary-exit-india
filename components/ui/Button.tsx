import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-accent text-white hover:bg-accent-hover active:bg-accent-hover",
    secondary:
      "border border-border-strong bg-surface text-foreground hover:bg-surface-subtle",
    ghost:
      "text-foreground-secondary hover:text-foreground hover:bg-surface-subtle",
  };

  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
