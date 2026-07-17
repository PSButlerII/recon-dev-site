import { EngineeringLifecycleSection } from "@/components/labs/EngineeringLifecycleSection";
import { CallToAction } from "@/components/site/CallToAction";
import { ContentSection } from "@/components/site/ContentSection";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { SiteHeader } from "@/components/site/SiteHeader";
import { labAreas } from "@/data/labs";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Labs",
  description:
    "Recon Dev Labs documents research-first technical exploration, internal builds, in-progress work, and prototype planning without overstating results.",
  path: "/labs",
});

export default function LabsPage() {
  return (
    <PageShell>
      <SiteHeader />
      <PageHero
        eyebrow="Recon Dev Labs"
        title="A public view into the engineering lifecycle"
      >
        Labs is where Recon Dev organizes research-first technical exploration,
        internal builds, in-progress work, and prototype planning without
        overstating history, milestones, or client results.
      </PageHero>

      <ContentSection>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Engineering Lifecycle
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Every lab effort is easier to understand when its phase is visible.
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            This lifecycle is a practical checklist for how Recon Dev moves from
            unclear questions to researched, documented, validated, and
            maintainable work. Not every effort reaches every phase.
          </p>
        </div>

        <div className="mt-10">
          <EngineeringLifecycleSection />
        </div>
      </ContentSection>

      <ContentSection background="white" className="border-y border-slate-200">
        <div className="grid gap-6 lg:grid-cols-3">
          {labAreas.map((area) => (
            <article
              key={area.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-7"
            >
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                {area.title}
              </h2>
              <p className="mt-4 leading-7 text-slate-600">{area.summary}</p>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <EngineeringLifecycleSection compact lifecycle={area.lifecycle} />
              </div>
            </article>
          ))}
        </div>
      </ContentSection>

      <CallToAction
        eyebrow="Research-first work"
        title="Start with the question before choosing the build."
        text="If a problem needs investigation, planning, documentation, or prototype thinking, Recon Dev can help map where it belongs in the lifecycle."
        buttonText="Discuss a lab-style project"
        buttonHref="/contact"
      />
    </PageShell>
  );
}
