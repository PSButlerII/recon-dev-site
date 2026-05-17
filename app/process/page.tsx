import { process } from "@/data/home";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CallToAction } from "@/components/site/CallToAction";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
export const metadata = {
  title: "Process",
  description:
    "Learn the Recon Dev LLC process: ask simple questions, research the problem, build a practical solution, then refine and support it.",
};

export default function ProcessPage() {
  return (
    <PageShell>
      <SiteHeader />
      <PageHero
        eyebrow="Process"
        title="A practical process for turning unclear problems into usable solutions"
      >
        Recon Dev starts by understanding the goal, then researches the problem,
        builds the simplest useful version, tests it, and improves from there.
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {process.map((step, index) => (
              <article
                key={step.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold text-white">
                  {index + 1}
                </div>

                <h2 className="text-2xl font-bold">{step.title}</h2>

                <p className="mt-4 leading-8 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="white" className="border-y border-slate-200">
        <Container>
          <div className="rounded-3xl bg-slate-950 p-8 text-white md:p-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              Core idea
            </p>

            <h2 className="text-3xl font-bold tracking-tight">
              Do not build blindly. Understand first.
            </h2>

            <p className="mt-5 max-w-3xl leading-8 text-slate-300">
              Recon Dev uses a simple but disciplined approach: clarify the
              objective, identify the real blocker, research the options, test a
              practical path, and document the result so the work can be
              understood, repeated, improved, or handed off.
            </p>
          </div>
        </Container>
      </Section>
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