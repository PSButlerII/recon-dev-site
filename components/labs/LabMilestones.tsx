import type { LabMilestone } from "@/data/labs";

type LabMilestonesProps = {
  milestones: LabMilestone[];
  className?: string;
};

const fallbackMilestones: LabMilestone[] = [
  { id: "research", title: "Research Complete", completed: true },
  { id: "requirements", title: "Requirements Defined", completed: true },
  { id: "prototype", title: "Prototype Working", completed: true },
  { id: "testing", title: "Testing", completed: false },
  { id: "documentation", title: "Documentation", completed: false },
  { id: "release", title: "Production Release", completed: false },
];

export function LabMilestones({ milestones, className }: LabMilestonesProps) {
  const visibleMilestones = milestones.length > 0 ? milestones : fallbackMilestones;

  return (
    <div
      className={[
        "flex flex-wrap items-center gap-2 text-sm font-medium text-slate-700",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {visibleMilestones.map((milestone, index) => (
        <span
          key={milestone.id ?? `${milestone.title}-${index}`}
          className="inline-flex items-center gap-1.5"
        >
          <span
            aria-hidden="true"
            className={milestone.completed ? "text-emerald-600" : "text-slate-400"}
          >
            {milestone.completed ? "✓" : "○"}
          </span>
          <span>{milestone.title}</span>
        </span>
      ))}
    </div>
  );
}
