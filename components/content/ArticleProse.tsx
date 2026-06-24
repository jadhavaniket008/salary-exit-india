import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/** Consistent reading typography for guides — no extra Tailwind Typography dependency. */
export function ArticleProse({ children }: Props) {
  return (
    <div className="prose-article space-y-5 text-[15px] leading-relaxed text-foreground-secondary [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:marker:text-foreground-muted [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2">
      {children}
    </div>
  );
}
