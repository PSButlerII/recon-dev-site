import { PageHero } from "@/components/site/PageHero";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import { Container } from "@/components/site/Container";

export const metadata = {
  title: "About",
  description:
    "Learn about Recon Dev LLC, a practical research, development, IT support, software, and prototyping company helping small businesses, inventors, and hands-on operators.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <SiteHeader />
      <PageHero
      eyebrow="About Recon Dev"
      title="Built around practical problem solving, research, and real-world support"
    >
      Recon Dev LLC exists to help people move from scattered problems to clear next
      steps, working systems, and usable documentation.
    </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">The short version</h2>

          <p className="mt-4 leading-8 text-slate-600">
            Recon Dev LLC is a hands-on technical support and development
            company focused on helping small businesses, startups, inventors,
            and independent operators solve practical problems.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            The work can include IT support, software development, systems
            review, technical documentation, research, debugging, quality
            review, and early prototype planning.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
          <h2 className="text-2xl font-bold">The operating mindset</h2>

          <div className="mt-6 space-y-4">
            {[
              "Ask simple questions before building complex solutions.",
              "Research before guessing.",
              "Test ideas before treating them as facts.",
              "Document what was found, what was tried, and what worked.",
              "Build practical systems that real people can use.",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 p-4">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section background="white" className="border-y border-slate-200">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Operating philosophy
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              The work starts by finding the real problem.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Recon Dev is built around research, testing, documentation, and
              practical execution. The goal is not to make a project sound more
              complicated than it is. The goal is to understand what matters, find the
              root blocker, and create a path that can actually be used.
            </p>
          </div>
        </Container>
      </Section>


      <Section background="white" className="border-y border-slate-200">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight">
            Why Recon Dev is different
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Many companies separate consulting, software, IT support,
            documentation, and prototyping into different silos. Recon Dev is
            built for the messy middle, where a client may not know whether
            they need a website, a workflow, a device setup, a prototype plan,
            or simply someone to untangle the problem.
          </p>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            The goal is not to overcomplicate the work. The goal is to identify
            the real problem, create a practical path forward, and help execute
            that path with clear communication.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}