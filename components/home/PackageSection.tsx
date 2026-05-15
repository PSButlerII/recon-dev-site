import { packages } from "@/data/home";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CheckCircle2 } from "lucide-react";

export function PackagesSection() {
  return (
    <section id="packages" className="border-y border-slate-200 bg-white px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Packages"
          title="Start small, then scale what works"
        >
          Pricing can stay hourly for simple support or become project-based
          when the scope is clear.
        </SectionHeading>

        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((item) => (
            <article
              key={item.name}
              className={`rounded-3xl border border-slate-200 p-7 shadow-sm ${
                item.featured ? "bg-slate-950 text-white" : "bg-white"
              }`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{item.name}</h3>

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
      </div>
    </section>
  );
}