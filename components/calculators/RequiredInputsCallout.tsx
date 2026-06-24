type Props = {
  items: string[];
};

export function RequiredInputsCallout({ items }: Props) {
  return (
    <section
      aria-labelledby="required-inputs-heading"
      className="rounded-xl border border-border bg-surface-subtle p-4"
    >
      <h2
        id="required-inputs-heading"
        className="text-sm font-semibold text-foreground"
      >
        Required inputs
      </h2>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
        {items.map((item) => (
          <li key={item} className="text-foreground-secondary">{item}</li>
        ))}
      </ul>
    </section>
  );
}
