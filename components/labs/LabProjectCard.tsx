import { Badge } from "@/components/site/Badge";
import type { LabProject } from "@/data/labs";

type LabProjectCardProps = {
  project: LabProject;
};

export function LabProjectCard({ project }: LabProjectCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{project.status}</Badge>
        <Badge>{project.category}</Badge>
      </div>

      <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
        {project.title}
      </h2>

      <p className="mt-4 leading-7 text-slate-600">{project.summary}</p>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Maturity</span>
          <span>{project.maturity}%</span>
        </div>

        <div className="h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-slate-950"
            style={{ width: `${project.maturity}%` }}
          />
        </div>
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
  );
}