import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  headingLevel?: 1 | 2;
};

export function SectionHeading({
  eyebrow,
  title,
  children,
  headingLevel = 2,
}: SectionHeadingProps) {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
        {eyebrow}
      </p>

      <Heading className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
        {title}
      </Heading>

      {children ? (
        <p className="mt-4 text-base leading-7 text-slate-600">{children}</p>
      ) : null}
    </div>
  );
}
