import { LabProjectCard } from "@/components/labs/LabProjectCard";
import type { LabProject } from "@/data/labs";

type RelatedLabProjectsProps = {
  currentSlug: string;
  projects: LabProject[];
};

export function RelatedLabProjects({
  currentSlug,
  projects,
}: RelatedLabProjectsProps) {
  const relatedProjects = projects
    .filter((project) => project.slug !== currentSlug)
    .slice(0, 3);

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Related Labs
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-slate-950">
          Explore other active ideas
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {relatedProjects.map((project) => (
          <LabProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}