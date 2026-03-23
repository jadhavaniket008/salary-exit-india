import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/** Consistent reading typography for guides — no extra Tailwind Typography dependency. */
export function ArticleProse({ children }: Props) {
  return (
    <div className="prose-article space-y-5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_h2]:dark:text-zinc-50 [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-zinc-900 [&_h3]:dark:text-zinc-100 [&_li]:marker:text-zinc-400 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:text-zinc-900 [&_strong]:dark:text-zinc-50 [&_ul]:list-disc [&_ul]:pl-5 [&_a]:font-medium [&_a]:text-zinc-900 [&_a]:underline [&_a]:underline-offset-2 [&_a]:dark:text-zinc-100">
      {children}
    </div>
  );
}
