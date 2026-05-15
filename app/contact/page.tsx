import { ContactSection } from "@/components/home/ContactSection";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export const metadata = {
  title: "Contact | Recon Dev LLC",
  description:
    "Contact Recon Dev LLC for IT support, software development, systems review, documentation, research, or prototype planning.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
        <SiteHeader />
      <PageHero
  eyebrow="Contact"
  title="Tell Recon Dev what you are trying to build, fix, or understand"
>
  The best starting point is simple: explain the goal, the blocker, and what has
  already been tried.
</PageHero>

      <ContactSection />
      <SiteFooter />
    </main>
  );
}