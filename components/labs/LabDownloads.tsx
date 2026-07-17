import Link from "next/link";

import type { LabLink } from "@/data/labs";

type LabDownloadsProps = {
  downloads: LabLink[];
};

export function LabDownloads({ downloads }: LabDownloadsProps) {
  if (downloads.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        Downloads
      </h2>
      <ul className="mt-5 grid gap-3">
        {downloads.map((download) => (
          <li key={`${download.label}-${download.href}`}>
            <Link
              href={download.href}
              prefetch={false}
              className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              {download.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
