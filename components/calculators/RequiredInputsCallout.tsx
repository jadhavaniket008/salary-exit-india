type Props = {
  items: string[];
};

export function RequiredInputsCallout({ items }: Props) {
  return (
    <section
      aria-labelledby="required-inputs-heading"
      className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <h2
        id="required-inputs-heading"
        className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
      >
        Required inputs
      </h2>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
