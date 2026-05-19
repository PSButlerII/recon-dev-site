import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Recon Dev LLC, including how contact and project inquiry information is handled.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
      >
        This page explains how Recon Dev LLC handles information submitted
        through this website.
      </PageHero>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-8 leading-7 text-slate-600">
              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  Information collected
                </h2>
                <p className="mt-3">
                  Recon Dev LLC may collect information submitted through the
                  contact or project inquiry form, including name, email,
                  company or organization, project type, goals, timeline, budget
                  range, preferred contact method, and additional project
                  details.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  How information is used
                </h2>
                <p className="mt-3">
                  Information is used to review project inquiries, respond to
                  potential clients, understand project needs, provide support,
                  and maintain internal records related to business
                  communication.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  Email and CRM processing
                </h2>
                <p className="mt-3">
                  Inquiry information may be sent by email and may later be
                  stored in an internal CRM or service request system for
                  tracking and follow-up.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  Data sharing
                </h2>
                <p className="mt-3">
                  Recon Dev LLC does not sell submitted inquiry information.
                  Information may be processed through trusted tools used for
                  email delivery, hosting, or internal business operations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  Contact
                </h2>
                <p className="mt-3">
                  Questions about this policy can be sent to{" "}
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
        </Container>
      </Section>
    </PageShell>
  );
}