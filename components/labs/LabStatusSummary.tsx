import { labStatusDefinitions } from "@/data/lab-statuses";
import { labProjects } from "@/data/labs";

export function LabStatusSummary() {
  const visibleStatuses = labStatusDefinitions
    .map((item) => ({
      status: item.status,
      count: labProjects.filter((project) => project.status === item.status)
        .length,
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