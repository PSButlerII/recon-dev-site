import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { siteConfig } from "@/data/site";
import { ContentSection } from "@/components/site/ContentSection";

export const metadata = {
  title: "Accessibility",
  description:
    "Accessibility statement for Recon Dev LLC and its commitment to making the website usable and clear.",
};

export default function AccessibilityPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Accessibility" title="Accessibility Statement">
        Recon Dev LLC aims to make this website clear, usable, and accessible to
        as many visitors as possible.
      </PageHero>

      <ContentSection >
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-8 leading-7 text-slate-600">
              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  Our approach
                </h2>
                <p className="mt-3">
                  This website is built with attention to readable text,
                  semantic structure, responsive layouts, keyboard-friendly
                  navigation, and clear form fields.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  Ongoing improvement
                </h2>
                <p className="mt-3">
                  Accessibility is an ongoing effort. As the website grows,
                  Recon Dev LLC will continue improving usability, clarity, and
                  compatibility across devices and assistive technologies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-950">
                  Feedback
                </h2>
                <p className="mt-3">
                  If you experience difficulty using this website, contact{" "}
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="font-semibold text-slate-950 underline"
                  >
                    {siteConfig.contactEmail}
                  </a>{" "}
                  with a description of the issue.
                </p>
              </section>
            </div>
          </div>
        </ContentSection>
    </PageShell>
  );
}