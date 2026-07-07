import Link from "next/link";

type LabResource = {
  label: string;
  href: string;
};

type LabResourcesProps = {
  resources: LabResource[];
};

export function LabResources({ resources }: LabResourcesProps) {
  if (resources.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        Resources
      </h2>

      <div className="mt-5 grid gap-3">
        {resources.map((resource) => (
          <Link
            key={resource.href}
            href={resource.href}
            prefetch={false}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            {resource.label}
          </Link>
        ))}
      </div>
    </section>
  );
}