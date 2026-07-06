import { labStatusDefinitions } from "@/data/lab-statuses";

export function LabLegend() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
        Status Legend
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {labStatusDefinitions.map((item) => (
          <div key={item.status}>
            <h3 className="font-bold text-slate-950">{item.status}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}