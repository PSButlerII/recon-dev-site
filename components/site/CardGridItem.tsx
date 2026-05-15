import type { LucideIcon } from "lucide-react";

type CardGridItemProps = {
  icon: LucideIcon;
  title: string;
  summary: string;
  tags: string[];
};

export function CardGridItem({
  icon: Icon,
  title,
  summary,
  tags,
}: CardGridItemProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
        <Icon className="h-6 w-6" />
      </div>

      <h2 className="text-2xl font-bold">{title}</h2>

      <p className="mt-4 leading-7 text-slate-600">{summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}