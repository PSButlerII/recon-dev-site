import { projects } from "@/data/projects";
import { CardGridItem } from "@/components/site/CardGridItem";
import { PageHero } from "@/components/site/PageHero";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CallToAction } from "@/components/site/CallToAction";
import { PageShell } from "@/components/site/PageShell";
import { ContentSection } from "@/components/site/ContentSection";

export const metadata = {
  title: "Project Areas",
  description:
    "Explore Recon Dev LLC project areas including web applications, IT support, systems review, research documentation, security review, and prototype planning.",
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <SiteHeader />
     <PageHero
        eyebrow="Project Areas"
        title="Examples of the kinds of problems Recon Dev can support"
      >
        This page highlights project areas and capability examples. Full case studies
        can be added as completed client work, internal builds, and deployed projects
        become available.
      </PageHero>

      <ContentSection>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <CardGridItem
                key={project.title}
                icon={project.icon}
                title={project.title}
                summary={project.summary}
                tags={project.examples}
              />
            ))}
          </div>
        </ContentSection>

      <ContentSection background="white" className="border-y border-slate-200">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Case studies
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Real project writeups will be added carefully.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Recon Dev will only publish case studies when the work can be described
              accurately, respectfully, and without exposing client-sensitive details.
              Internal builds, deployed tools, and completed client projects may be
              added here as the portfolio grows.
            </p>
          </div>
        </ContentSection>

      <CallToAction
        eyebrow="Have a project like this?"
        title="Turn the rough idea into a practical next step."
        text="Whether it is a web app, workflow, prototype plan, or troubleshooting problem, Recon Dev can help define the path and build from there."
        buttonText="Discuss a project"
        buttonHref="/contact"
      />
    </PageShell>
  );
}