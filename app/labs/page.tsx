import { LabProjectCard } from "@/components/labs/LabProjectCard";
import { CallToAction } from "@/components/site/CallToAction";
import { ContentSection } from "@/components/site/ContentSection";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { labProjects } from "@/data/labs";
import { createPageMetadata } from "@/lib/metadata";
import { LabLegend } from "@/components/labs/LabLegend";
import { LabOverviewPanel } from "@/components/labs/LabOverviewPanel";
import { LabDisclosure } from "@/components/labs/LabDisclosure";

export const metadata = createPageMetadata({
  title: "Labs",
  description:
    "Explore Recon Dev Labs: research, prototypes, internal tools, experiments, and active technical development work.",
  path: "/labs",
});

export default function LabsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Recon Dev Labs"
        title="Research, prototypes, internal tools, and technical experiments"
      >
        Labs is where Recon Dev tracks active ideas, prototype work, research
        directions, and internal systems before they become products, services,
        or full case studies.
      </PageHero>

      <ContentSection>
        <LabOverviewPanel />

        <div className="mt-6">
          <LabDisclosure />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {labProjects.map((project) => (
            <LabProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-10">
  <LabLegend />
</div>
      </ContentSection>

      <ContentSection background="white" className="border-y border-slate-200">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Why Labs Exists
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Not every valuable project starts as a polished product.
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Recon Dev Labs gives research, experiments, prototypes, and internal
            tools a proper place to live. Some ideas may become services,
            products, client systems, documentation, or case studies. Others may
            simply teach something useful.
          </p>
        </div>
      </ContentSection>

      <CallToAction
        eyebrow="Have a rough idea?"
        title="Labs-style work starts with exploration."
        text="If you have an idea, prototype, technical blocker, or unfinished system, Recon Dev can help research the path and decide what should happen next."
        buttonText="Start a project inquiry"
        buttonHref="/contact"
      />
    </PageShell>
  );
}