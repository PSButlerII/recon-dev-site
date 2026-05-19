import { processSteps } from "@/data/process-steps";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";

export function ProcessTimelineSection() {
  return (
    <Section background="white" className="border-y border-slate-200">
      <Container>
        <SectionHeading
          eyebrow="Workflow"
          title="How projects move forward"
        >
          Recon Dev focuses on practical progress, clear communication, and
          understanding the actual problem before forcing solutions.
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((item) => (
            <article
              key={item.step}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="text-sm font-bold tracking-[0.2em] text-slate-400">
                {item.step}
              </div>

              <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-950">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}