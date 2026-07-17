import Link from "next/link";

import type { LabLink } from "@/data/labs";

type LabReferencesProps = {
  references: LabLink[];
};

export function LabReferences({ references }: LabReferencesProps) {
  if (references.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        References
      </h2>
      <ul className="mt-5 grid gap-3">
        {references.map((reference) => (
          <li key={`${reference.label}-${reference.href}`}>
            <Link
              href={reference.href}
              prefetch={false}
              className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              {reference.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
