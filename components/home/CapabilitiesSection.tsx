import { capabilities } from "@/data/capabilities";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";

export function CapabilitiesSection() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="Built for practical technical problem solving"
        >
          Recon Dev combines research, software, systems thinking, and
          hands-on technical work to help small operators move projects
          forward.
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-2">
          {capabilities.map((capability) => (
            <article
              key={capability.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <h3 className="text-xl font-bold tracking-tight text-slate-950">
                {capability.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {capability.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}