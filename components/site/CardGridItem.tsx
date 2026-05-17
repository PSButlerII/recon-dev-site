import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/site/Badge";

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
    <article className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 transition group-hover:bg-slate-950 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>

      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

      <p className="mt-4 leading-7 text-slate-600">{summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </article>
  );
}