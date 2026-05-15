import { process } from "@/data/home";
import { SectionHeading } from "@/components/site/SectionHeading";

export function ProcessSection() {
  return (
    <section id="process" className="border-y border-slate-200 bg-white px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Approach"
          title="Research first. Build second. Simplify always."
        >
          The goal is not to sell unnecessary complexity. The goal is to
          discover the right next step and make it usable.
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-4">
          {process.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                {index + 1}
              </div>

              <h3 className="text-lg font-bold">{step.title}</h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}