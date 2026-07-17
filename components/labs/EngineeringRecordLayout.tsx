import Link from "next/link";

import { LabDesignDecisions } from "@/components/labs/LabDesignDecisions";
import { LabDevelopmentLog } from "@/components/labs/LabDevelopmentLog";
import { LabDownloads } from "@/components/labs/LabDownloads";
import { LabEngineeringLifecycle } from "@/components/labs/LabEngineeringLifecycle";
import { LabFutureImprovements } from "@/components/labs/LabFutureImprovements";
import { LabKnownLimitations } from "@/components/labs/LabKnownLimitations";
import { LabLessons } from "@/components/labs/LabLessons";
import { LabMaturityBar } from "@/components/labs/LabMaturityBar";
import { LabMilestones } from "@/components/labs/LabMilestones";
import { LabReferences } from "@/components/labs/LabReferences";
import { LabResources } from "@/components/labs/LabResources";
import { LabStatusBadge } from "@/components/labs/LabStatusBadge";
import { LabTradeoffs } from "@/components/labs/LabTradeoffs";
import { RelatedLabProjects } from "@/components/labs/RelatedLabProjects";
import { Badge } from "@/components/site/Badge";
import { ContentSection } from "@/components/site/ContentSection";
import { labProjects, type LabProject } from "@/data/labs";

type EngineeringRecordLayoutProps = {
  project: LabProject;
};

export function EngineeringRecordLayout({ project }: EngineeringRecordLayoutProps) {
  return (
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
              <dd className="mt-1 font-medium text-slate-700">{project.started}</dd>
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
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                Overview
              </h2>

              <p className="mt-4">{project.overview}</p>
            </section>

            <LabEngineeringLifecycle lifecycle={project.engineeringLifecycle} />

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

            <LabDesignDecisions decisions={project.designDecisions} />
            <LabTradeoffs tradeoffs={project.tradeoffs} />
            <LabKnownLimitations limitations={project.knownLimitations} />
            <LabDevelopmentLog entries={project.developmentLog} />
            <LabLessons lessons={project.lessonsLearned} />
            <LabDownloads downloads={project.downloads} />
            <LabReferences references={project.references} />
            <LabResources resources={project.resources} />
            <LabFutureImprovements improvements={project.futureImprovements} />

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                Future Direction
              </h2>
              <p className="mt-4">{project.futureDirection}</p>
            </section>
          </div>
        </article>
      </div>
      <RelatedLabProjects currentSlug={project.slug} projects={labProjects} />
    </ContentSection>
  );
}
