
import { notFound } from "next/navigation";

import { LabStatusBadge } from "@/components/labs/LabStatusBadge";
import { Badge } from "@/components/site/Badge";
import { CallToAction } from "@/components/site/CallToAction";
import { ContentSection } from "@/components/site/ContentSection";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { labProjects } from "@/data/labs";
import { createPageMetadata } from "@/lib/metadata";
import { LabMaturityBar } from "@/components/labs/LabMaturityBar";
import { RelatedLabProjects } from "@/components/labs/RelatedLabProjects";
import { LabDevelopmentLog } from "@/components/labs/LabDevelopmentLog";
import { LabLessons } from "@/components/labs/LabLessons";
import { LabMilestones } from "@/components/labs/LabMilestones";
import { LabResources } from "@/components/labs/LabResources";
import { LabEngineeringLifecycle } from "@/components/labs/LabEngineeringLifecycle";
import Link from "next/link";

type LabsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getLabProject(slug: string) {
  return labProjects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return labProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: LabsDetailPageProps) {
  const { slug } = await params;
  const project = getLabProject(slug);

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

export default async function LabsDetailPage({ params }: LabsDetailPageProps) {
  const { slug } = await params;
  const project = getLabProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageShell>
      <PageHero eyebrow="Recon Dev Labs" title={project.title}>
        {project.summary}
      </PageHero>

      <ContentSection>
        <Link
            href="/labs"
            prefetch={false}
            className="mb-6 inline-flex text-sm font-semibold text-slate-600 transition hover:text-slate-950"
            >
            ← Back to Labs
        </Link>
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
                  <LabMaturityBar lifecycle={project.engineeringLifecycle} />
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
                <LabEngineeringLifecycle
                  lifecycle={project.engineeringLifecycle}
                />
              </section>

              <section>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  Overview
                </h2>

                <p className="mt-4">{project.overview}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  Milestones
                </h2>

                <LabMilestones milestones={project.milestones} className="mt-4" />
              </section>

              <section>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  Current Focus
                </h2>

                <p className="mt-4">{project.currentFocus}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  Future Direction
                </h2>
                <LabDevelopmentLog entries={project.developmentLog} />
                <LabLessons lessons={project.lessonsLearned} />
                <LabResources resources={project.resources} />
                <p className="mt-4">{project.futureDirection}</p>
              </section>
            </div>
          </article>
        </div>
        <RelatedLabProjects currentSlug={project.slug} projects={labProjects} />

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
