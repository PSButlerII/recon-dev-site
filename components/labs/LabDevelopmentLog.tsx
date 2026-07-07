import { Badge } from "@/components/site/Badge";
import type { LabDevelopmentLogEntry } from "@/data/labs";

type LabDevelopmentLogProps = {
  entries: LabDevelopmentLogEntry[];
};

export function LabDevelopmentLog({ entries }: LabDevelopmentLogProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        Development Log
      </h2>

      <div className="mt-6 space-y-5">
        {entries.map((entry) => (
          <article
            key={`${entry.date}-${entry.title}`}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{entry.date}</Badge>
              <Badge>{entry.type}</Badge>
            </div>

            <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-950">
              {entry.title}
            </h3>

            <p className="mt-2 leading-7 text-slate-600">{entry.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}