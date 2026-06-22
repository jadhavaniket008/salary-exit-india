const TALLY_FORM_ID = "44E9bY";

interface Props {
  variant?: "card" | "inline";
}

export function CaConsultCta({ variant = "card" }: Props) {
  if (variant === "inline") {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Want a CA to verify these numbers for your situation?{" "}
        <a
          href={`https://tally.so/r/${TALLY_FORM_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900 dark:text-violet-400 dark:hover:text-violet-300"
        >
          Book a free 15-min call →
        </a>
      </p>
    );
  }

  return (
    <aside className="rounded-xl border border-violet-200 bg-violet-50/60 p-5 dark:border-violet-900/50 dark:bg-violet-950/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="font-semibold text-violet-950 dark:text-violet-100">
            Want a CA to review your tax situation?
          </p>
          <ul className="space-y-1 text-sm text-violet-900/80 dark:text-violet-200/80">
            <li>• Free 15-minute call — no commitment</li>
            <li>• Regime choice, ITR filing, salary restructuring</li>
            <li>• We match you with a CA, you talk directly</li>
          </ul>
        </div>
        <a
          href={`https://tally.so/r/${TALLY_FORM_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center justify-center rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 dark:bg-violet-600 dark:hover:bg-violet-500"
        >
          Book free call →
        </a>
      </div>
    </aside>
  );
}
