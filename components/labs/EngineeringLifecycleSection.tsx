import { CheckCircle2, Circle } from "lucide-react";
import {
  engineeringLifecyclePhaseDescriptions,
  engineeringLifecyclePhaseLabels,
  engineeringLifecyclePhases,
  type EngineeringLifecycle,
} from "@/data/engineering-lifecycle";

type EngineeringLifecycleSectionProps = {
  lifecycle?: EngineeringLifecycle;
  compact?: boolean;
};

export function EngineeringLifecycleSection({
  lifecycle,
  compact = false,
}: EngineeringLifecycleSectionProps) {
  const gridClass = compact
    ? "grid gap-3"
    : "grid gap-4 md:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={gridClass}>
      {engineeringLifecyclePhases.map((phase) => {
        const isActive = lifecycle?.[phase] ?? true;
        const Icon = isActive ? CheckCircle2 : Circle;

        return (
          <article
            key={phase}
            className={`rounded-3xl border p-5 ${
              isActive
                ? "border-slate-200 bg-white"
                : "border-dashed border-slate-300 bg-slate-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <Icon
                aria-hidden="true"
                className={`mt-0.5 h-5 w-5 shrink-0 ${
                  isActive ? "text-slate-950" : "text-slate-400"
                }`}
              />
              <div>
                <h3 className="font-bold text-slate-950">
                  {engineeringLifecyclePhaseLabels[phase]}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {engineeringLifecyclePhaseDescriptions[phase]}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
