import { packages } from "@/data/home";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { SiteHeader } from "@/components/site/SiteHeader";

export const metadata = {
  title: "Packages | Recon Dev LLC",
  description:
    "Review Recon Dev LLC service packages for starter support, project buildouts, systems review, IT support, software development, and technical planning.",
};

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <SiteHeader />
      <PageHero
        eyebrow="Packages"
        title="Flexible support for simple fixes, bigger builds, and unclear technical problems"
      >
        Start with hourly help when the issue is small, or move into a scoped
        project when the work needs planning, buildout, testing, and
        documentation.
      </PageHero>

      <section className="py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((item) => (
              <article
                key={item.name}
                className={`rounded-3xl border border-slate-200 p-7 shadow-sm ${
                  item.featured ? "bg-slate-950 text-white" : "bg-white"
                }`}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">{item.name}</h2>

                  <p
                    className={`mt-2 text-sm leading-6 ${
                      item.featured ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {item.audience}
                  </p>
                </div>

                <p className="mb-6 text-3xl font-black">{item.price}</p>

                <ul className="space-y-3">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-20">
        <Container>
          <div className="grid gap-8 rounded-3xl bg-slate-950 p-8 text-white md:grid-cols-[1fr_0.7fr] md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                Not sure where you fit?
              </p>

              <h2 className="text-3xl font-bold tracking-tight">
                Start with the problem, not the package.
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                Many technical problems do not fit neatly into a service box.
                Send the goal, the blocker, and what you have already tried.
                Recon Dev can help identify the right path.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
            >
              Request a consultation
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}