import type { LabProjectStatus } from "@/data/labs";
import { labProjects } from "@/data/labs";

const statuses: LabProjectStatus[] = [
  "Active Development",
  "Prototype",
  "Research",
  "Internal Tool",
  "Client Work / In Progress",
  "Concept",
  "Production",
  "Archived",
];

export function LabStatusSummary() {
  const visibleStatuses = statuses
    .map((status) => ({
      status,
      count: labProjects.filter((project) => project.status === status).length,
    }))
    .filter((item) => item.count > 0);

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      {visibleStatuses.map((item) => (
        <span
          key={item.status}
          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
        >
          {item.status}: {item.count}
        </span>
      ))}
    </div>
  );
}