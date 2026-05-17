import { packages } from "@/data/home";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CallToAction } from "@/components/site/CallToAction";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";

export const metadata = {
  title: "Packages",
  description:
    "Review Recon Dev LLC service packages for starter support, project buildouts, systems review, IT support, software development, and technical planning.",
};

export default function PackagesPage() {
  return (
    <PageShell>
      <SiteHeader />
      <PageHero
        eyebrow="Packages"
        title="Flexible support for simple fixes, bigger builds, and unclear technical problems"
      >
        Start with hourly help when the issue is small, or move into a scoped
        project when the work needs planning, buildout, testing, and
        documentation.
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((item) => (
              <article
                key={item.name}
                className={`rounded-3xl border border-slate-200 p-7 shadow-sm ${
                  item.featured ? "bg-slate-950 text-white" : "bg-white"
                }`}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">{item.name}</h2>

                  <p
                    className={`mt-2 text-sm leading-6 ${
                      item.featured ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {item.audience}
                  </p>
                </div>

                <p className="mb-6 text-3xl font-black">{item.price}</p>

                <ul className="space-y-3">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <CallToAction
          eyebrow="Not sure where you fit?"
          title="Start with the problem, not the package."
          text="Many technical problems do not fit neatly into a service box. Send the goal, the blocker, and what you have already tried. Recon Dev can help identify the right path."
          buttonText="Request a consultation"
          buttonHref="/contact"
        />
    </PageShell>
  );
}