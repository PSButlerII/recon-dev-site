import { ContactSection } from "@/components/home/ContactSection";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import { Container } from "@/components/site/Container";
import { InfoCard } from "@/components/site/InfoCard";
import { contactIntroCards } from "@/data/contact";

export const metadata = {
  title: "Contact",
  description:
    "Contact Recon Dev LLC for IT support, software development, systems review, documentation, research, or prototype planning.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <SiteHeader />
        <PageHero
          eyebrow="Contact"
          title="Start with the goal, the blocker, and the context"
        >
          You do not need a perfect project brief. Share what you are trying to build,
          fix, research, or understand, and Recon Dev will review the details.
        </PageHero>

        <Section>
          <Container>
            <div className="grid gap-6 md:grid-cols-3">
              {contactIntroCards.map((item) => (
              <InfoCard key={item.title} title={item.title} text={item.text} />
            ))}
            </div>
          </Container>
        </Section>

      <ContactSection />
      <SiteFooter />
    </PageShell>
  );
}