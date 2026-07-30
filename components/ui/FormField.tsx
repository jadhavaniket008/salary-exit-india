import { cloneElement, isValidElement, type HTMLAttributes, type ReactElement, type ReactNode } from "react";

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
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  // The single form control passed as children gets aria-describedby (pointing
  // at the hint/error text) and aria-invalid wired automatically, so every
  // calculator field is properly associated without repeating this at each
  // call site.
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
      })
    : children;

  return (
    <div className={`space-y-1.5 ${className}`} {...props}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {control}
      {hint ? (
        <p id={hintId} className="text-xs text-foreground-muted">{hint}</p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
