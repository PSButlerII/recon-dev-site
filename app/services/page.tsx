import { services } from "@/data/home";
import { CardGridItem } from "@/components/site/CardGridItem";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CallToAction } from "@/components/site/CallToAction";
import { PageShell } from "@/components/site/PageShell";
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
        title="Practical technical services for small teams, builders, and inventors"
      >
        Recon Dev LLC helps turn unclear technical problems into working plans,
        systems, documentation, and supportable solutions.
      </PageHero>

      <section className="py-20">
        <Container>
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
        </Container>
      </section>
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