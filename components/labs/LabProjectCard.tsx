import { Badge } from "@/components/site/Badge";
import type { LabProject } from "@/data/labs";
import { LabStatusBadge } from "./LabStatusBadge";
import Link from "next/link";
import { LabMaturityBar } from "@/components/labs/LabMaturityBar";

type LabProjectCardProps = {
  project: LabProject;
};

export function LabProjectCard({ project }: LabProjectCardProps) {
  return (
    <Link href={`/labs/${project.slug}`}>
    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-wrap items-center gap-2">
        <LabStatusBadge status={project.status} />
        <Badge>{project.category}</Badge>
      </div>

      <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
        {project.title}
      </h2>

      <p className="mt-4 leading-7 text-slate-600">{project.summary}</p>

      <div className="mt-6">
        <LabMaturityBar lifecycle={project.engineeringLifecycle} />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Started
          </dt>
          <dd className="mt-1 font-medium text-slate-700">{project.started}</dd>
        </div>

        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Updated
          </dt>
          <dd className="mt-1 font-medium text-slate-700">
            {project.lastUpdated}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Open Source
          </dt>
          <dd className="mt-1 font-medium text-slate-700">
            {project.openSource ? "Yes" : "No"}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Client Facing
          </dt>
          <dd className="mt-1 font-medium text-slate-700">
            {project.clientFacing ? "Yes" : "No"}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </article>
    </Link>
  );
}
