import type { HTMLAttributes, ReactNode } from "react";

export function FormField({
  label,
  id,
  hint,
  error,
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  label: string;
  id: string;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={`space-y-1.5 ${className}`} {...props}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {children}
      {hint ? (
        <p className="text-xs text-foreground-muted">{hint}</p>
      ) : null}
      {error ? (
        <p className="text-xs text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
