type Props = {
  messages: string[];
};

export function ValidationSummary({ messages }: Props) {
  if (messages.length === 0) return null;
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-100"
    >
      <p className="font-medium">Please fix the following:</p>
      <ul className="mt-1 list-inside list-disc">
        {messages.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </div>
  );
}
