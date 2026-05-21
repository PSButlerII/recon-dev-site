import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { whyReconPoints } from "@/data/why-recon";

const points = [
  {
    title: "For problems that do not fit one category",
    text: "Some requests are part website, part workflow, part troubleshooting, and part research. Recon Dev is built for that overlap.",
  },
  {
    title: "Simple questions before expensive solutions",
    text: "Before recommending tools or builds, Recon Dev works to understand the real objective, blocker, constraints, and best next step.",
  },
  {
    title: "Support for small operators and builders",
    text: "The focus is on small businesses, startups, inventors, and hands-on operators who need practical help without corporate layers.",
  },
];

export function WhyReconSection() {
  return (
    <Section background="white" className="border-y border-slate-200">
      <Container>
        <SectionHeading
          eyebrow="Why Recon Dev"
          title="A practical partner for the undefined middle"
        >
          When the problem is part technical, part operational, and part
          unknown, Recon Dev helps turn the mess into a usable path.
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-3">
          {whyReconPoints.map((point) => (
            <article
              key={point.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-7"
            >
              <h3 className="text-xl font-bold tracking-tight text-slate-950">
                {point.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">{point.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}