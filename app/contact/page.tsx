import { ContactSection } from "@/components/home/ContactSection";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageShell } from "@/components/site/PageShell";
import { InfoCard } from "@/components/site/InfoCard";
import { contactIntroCards } from "@/data/contact";
import { ContentSection } from "@/components/site/ContentSection";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Recon Dev LLC for IT support, software development, systems review, documentation, research, or prototype planning.",
});

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

        <ContentSection >
            <div className="grid gap-6 md:grid-cols-3">
              {contactIntroCards.map((item) => (
              <InfoCard key={item.title} title={item.title} text={item.text} />
            ))}
            </div>
         </ContentSection>

      <ContactSection />
      <SiteFooter />
    </PageShell>
  );
}