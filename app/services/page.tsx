import { services } from "@/data/home";
import { CardGridItem } from "@/components/site/CardGridItem";
import { PageHero } from "@/components/site/PageHero";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CallToAction } from "@/components/site/CallToAction";
import { PageShell } from "@/components/site/PageShell";
import { ContentSection } from "@/components/site/ContentSection";

export const metadata = {
  title: "Services",
  description:
    "Explore Recon Dev LLC services including IT support, web development, systems review, security review, research documentation, and prototype planning.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <SiteHeader />
        <PageHero
          eyebrow="Services"
          title="Practical technical services for unclear, unfinished, or complex problems"
        >
          Recon Dev LLC supports small businesses, inventors, startups, and hands-on
          operators with software, systems, research, documentation, support, and
          prototype planning.
        </PageHero>

      <ContentSection>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <CardGridItem
                key={service.title}
                icon={service.icon}
                title={service.title}
                summary={service.summary}
                tags={service.tags}
              />
            ))}
          </div>
        </ContentSection>

      <ContentSection background="white" className="border-y border-slate-200">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Flexible support
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Services can be combined when the problem does not fit one box.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              A project may start as a website, become a workflow review, require
              documentation, and eventually need custom software or prototype
              planning. Recon Dev is designed to support that kind of practical
              overlap.
            </p>
          </div>
        </ContentSection>
      <CallToAction
        eyebrow="Need help choosing?"
        title="You do not need to know the exact service before reaching out."
        text="Describe the goal and the blocker. Recon Dev can help sort whether the right next step is support, software, documentation, research, or prototype planning."
        buttonText="Start with a project inquiry"
        buttonHref="/contact"
      />
    </PageShell>
  );
}