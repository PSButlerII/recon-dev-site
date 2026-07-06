import { labProjects } from "@/data/labs";

export function LabStats() {
  const activeCount = labProjects.filter(
    (project) =>
      project.status === "Active Development" ||
      project.status === "Prototype" ||
      project.status === "Research"
  ).length;

  const clientFacingCount = labProjects.filter(
    (project) => project.clientFacing
  ).length;

  const internalCount = labProjects.filter(
    (project) => !project.clientFacing
  ).length;

  const stats = [
    {
      label: "Tracked Labs",
      value: labProjects.length,
    },
    {
      label: "Active / Research",
      value: activeCount,
    },
    {
      label: "Internal R&D",
      value: internalCount,
    },
    {
      label: "Client-Facing",
      value: clientFacingCount,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm"
        >
          <p className="text-3xl font-black tracking-tight text-slate-950">
            {stat.value}
          </p>

          <p className="mt-2 text-sm font-medium text-slate-500">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}