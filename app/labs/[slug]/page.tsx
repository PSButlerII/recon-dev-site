
import { notFound } from "next/navigation";

import { LabStatusBadge } from "@/components/labs/LabStatusBadge";
import { Badge } from "@/components/site/Badge";
import { CallToAction } from "@/components/site/CallToAction";
import { ContentSection } from "@/components/site/ContentSection";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { labProjects } from "@/data/labs";
import { createPageMetadata } from "@/lib/metadata";

type LabsDetailPageProps = {
  params: {
    slug: string;
  };
};

function getLabProject(slug: string) {
  return labProjects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return labProjects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: LabsDetailPageProps) {
  const project = getLabProject(params.slug);

  if (!project) {
    return createPageMetadata({
      title: "Lab Project Not Found",
      description: "The requested Recon Dev Labs project could not be found.",
      path: "/labs",
    });
  }

  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/labs/${project.slug}`,
  });
}

export default function LabsDetailPage({ params }: LabsDetailPageProps) {
  const project = getLabProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <PageShell>
      <PageHero eyebrow="Recon Dev Labs" title={project.title}>
        {project.summary}
      </PageHero>

      <ContentSection>
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex flex-wrap gap-2">
              <LabStatusBadge status={project.status} />
              <Badge>{project.category}</Badge>
            </div>

            <dl className="mt-8 space-y-5 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Started
                </dt>
                <dd className="mt-1 font-medium text-slate-700">
                  {project.started}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Last Updated
                </dt>
                <dd className="mt-1 font-medium text-slate-700">
                  {project.lastUpdated}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Maturity
                </dt>
                <dd className="mt-2">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Progress</span>
                    <span>{project.maturity}%</span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-slate-950"
                      style={{ width: `${project.maturity}%` }}
                    />
                  </div>
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

            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </aside>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-8 leading-8 text-slate-600">
              <section>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  Overview
                </h2>

                <p className="mt-4">{project.summary}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  Current Focus
                </h2>

                <p className="mt-4">
                  This project is being tracked as part of Recon Dev Labs. The
                  current focus is to continue researching practical use cases,
                  identify blockers, document lessons learned, and determine
                  whether the idea should become a service, internal tool,
                  public writeup, or full project case study.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  Future Direction
                </h2>

                <p className="mt-4">
                  Future updates may include technical notes, diagrams,
                  screenshots, GitHub links, documentation, development logs,
                  prototypes, or deployment details as the work matures.
                </p>
              </section>
            </div>
          </article>
        </div>
      </ContentSection>

      <CallToAction
        eyebrow="Interested in similar work?"
        title="Labs projects often start as rough ideas."
        text="If you have a technical concept, prototype, internal tool, workflow problem, or unfinished system, Recon Dev can help explore the path forward."
        buttonText="Start a project inquiry"
        buttonHref="/contact"
      />
    </PageShell>
  );
}