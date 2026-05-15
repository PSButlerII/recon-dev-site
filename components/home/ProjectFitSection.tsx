import { projectTypes } from "@/data/home";

export function ProjectFitSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Project fit
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Built for the small teams doing real work.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Recon Dev is a fit when you need someone who can research,
            troubleshoot, document, build, test, and explain the work without
            hiding behind jargon.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {projectTypes.map((type) => (
            <div
              key={type}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold shadow-sm"
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}