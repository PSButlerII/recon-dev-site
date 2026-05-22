import { projectFitItems } from "@/data/home";
import { ContentSection } from "@/components/site/ContentSection";

export function ProjectFitSection() {
  return (
    <ContentSection background="white" className="border-y border-slate-200">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Project fit
            </p>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Built for practical operators, builders, and technical problem
              solving.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Recon Dev is a good fit when the work requires research,
              troubleshooting, documentation, technical planning, development,
              or someone who can help clarify the real problem before building.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {projectFitItems.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold tracking-tight text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
    </ContentSection>
  );
}