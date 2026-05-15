"use client";

import { useMemo, useState } from "react";
import { services } from "@/data/home";
import { SectionHeading } from "@/components/site/SectionHeading";

export function ServicesSection() {
  const [serviceFilter, setServiceFilter] = useState("All");

  const filters = ["All", "Software", "Support", "Security", "Prototype", "Research"];

  const filteredServices = useMemo(() => {
    if (serviceFilter === "All") return services;

    const key = serviceFilter.toLowerCase();

    return services.filter((service) => {
      const blob = `${service.title} ${service.summary} ${service.tags.join(" ")}`.toLowerCase();

      return blob.includes(key) || (key === "prototype" && blob.includes("3d"));
    });
  }, [serviceFilter]);

  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-20">
      <SectionHeading
        eyebrow="Services"
        title="Technical help without the corporate fog"
      >
        Choose a focused service or combine support, software, documentation,
        and prototype planning into one practical project.
      </SectionHeading>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setServiceFilter(filter)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              serviceFilter === filter
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => {
          const Icon = service.icon;

          return (
            <article
              key={service.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-bold">{service.title}</h3>

              <p className="mt-3 leading-7 text-slate-600">
                {service.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}