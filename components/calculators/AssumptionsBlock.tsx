type Props = {
  title?: string;
  bullets: string[];
};

export function AssumptionsBlock({
  title = "Assumptions used by this estimate",
  bullets,
}: Props) {
  return (
    <section
      aria-labelledby="assumptions-heading"
      className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/30"
    >
      <h2
        id="assumptions-heading"
        className="text-sm font-semibold text-amber-950 dark:text-amber-100"
      >
        {title}
      </h2>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-amber-950/90 dark:text-amber-100/90">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </section>
  );
}
