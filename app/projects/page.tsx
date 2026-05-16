import { projects } from "@/data/projects";
import { CardGridItem } from "@/components/site/CardGridItem";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CallToAction } from "@/components/site/CallToAction";

export const metadata = {
  title: "Projects | Recon Dev LLC",
  description:
    "Explore examples of Recon Dev LLC project work, including web applications, IT support, systems review, documentation, security review, and prototype planning.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <SiteHeader />
      <PageHero
        eyebrow="Projects"
        title="A practical look at the kinds of problems Recon Dev solves"
      >
        This page can grow into full case studies. For now, it gives visitors a
        clear view of the project categories Recon Dev can support.
      </PageHero>

      <section className="py-20">
        <Container>
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
        </Container>
      </section>
      <CallToAction
        eyebrow="Have a project like this?"
        title="Turn the rough idea into a practical next step."
        text="Whether it is a web app, workflow, prototype plan, or troubleshooting problem, Recon Dev can help define the path and build from there."
        buttonText="Discuss a project"
        buttonHref="/contact"
      />
    </main>
  );
}