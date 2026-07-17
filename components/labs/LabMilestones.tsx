import type { LabMilestone } from "@/data/labs";

type LabMilestonesProps = {
  milestones: LabMilestone[];
  className?: string;
};

export function LabMilestones({ milestones, className }: LabMilestonesProps) {
  if (milestones.length === 0) {
    return (
      <p className={["text-sm text-slate-500", className].filter(Boolean).join(" ")}>
        No milestones have been documented yet.
      </p>
    );
  }

  return (
    <div
      className={[
        "flex flex-wrap items-center gap-2 text-sm font-medium text-slate-700",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {milestones.map((milestone, index) => (
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
