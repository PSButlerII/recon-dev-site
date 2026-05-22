import { faqs } from "@/data/faq";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ContentSection } from "@/components/site/ContentSection";

export function FaqSection() {
  return (
    <ContentSection background="white" className="border-y border-slate-200">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions before starting?"
        >
          A few quick answers for visitors who are deciding whether Recon Dev is
          the right fit.
        </SectionHeading>

        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map((item) => (
            <article
              key={item.question}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <h3 className="text-lg font-bold text-slate-950">
                {item.question}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </ContentSection>
  );
}