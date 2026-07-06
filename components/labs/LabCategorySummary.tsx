import { labCategories } from "@/data/lab-categories";
import { labProjects } from "@/data/labs";

export function LabCategorySummary() {
  const visibleCategories = labCategories
    .map((category) => ({
      category,
      count: labProjects.filter((project) => project.category === category)
        .length,
    }))
    .filter((item) => item.count > 0);

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {visibleCategories.map((item) => (
        <span
          key={item.category}
          className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200"
        >
          {item.category}: {item.count}
        </span>
      ))}
    </div>
  );
}