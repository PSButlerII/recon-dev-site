import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { siteConfig } from "@/data/site";
import { ContentSection } from "@/components/site/ContentSection";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Terms of service for Recon Dev LLC website, project inquiries, consulting, support, and technical services.",
});

export default function TermsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Terms" title="Terms of Service">
        These terms provide general expectations for using this website and
        contacting Recon Dev LLC about services.
      </PageHero>

      <ContentSection>
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-8 leading-7 text-slate-600">
              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  Website use
                </h2>
                <p className="mt-3">
                  This website provides general information about Recon Dev LLC,
                  available services, project examples, and ways to submit a
                  project inquiry.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  Project inquiries
                </h2>
                <p className="mt-3">
                  Submitting an inquiry does not create a service agreement,
                  contract, guarantee of availability, or obligation for Recon
                  Dev LLC to accept the project.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  Estimates and scope
                </h2>
                <p className="mt-3">
                  Any estimate, timeline, or recommendation provided before a
                  formal agreement is preliminary and may change after project
                  details, requirements, and constraints are reviewed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  No professional guarantee
                </h2>
                <p className="mt-3">
                  Recon Dev LLC provides practical technical support,
                  development, research, documentation, and planning services.
                  Results may vary based on project complexity, third-party
                  systems, client-provided information, and external
                  limitations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  Contact
                </h2>
                <p className="mt-3">
                  Questions about these terms can be sent to{" "}
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="font-semibold text-slate-950 underline"
                  >
                    {siteConfig.contactEmail}
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </ContentSection>
    </PageShell>
  );
}