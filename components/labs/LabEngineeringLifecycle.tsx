import {
  calculateLifecycleMaturity,
  engineeringLifecycleLabels,
  engineeringLifecyclePhases,
  type EngineeringLifecycle,
} from "@/data/engineering-lifecycle";

type LabEngineeringLifecycleProps = {
  lifecycle: EngineeringLifecycle;
};

export function LabEngineeringLifecycle({
  lifecycle,
}: LabEngineeringLifecycleProps) {
  const completedCount = engineeringLifecyclePhases.filter(
    (phase) => lifecycle[phase],
  ).length;
  const maturity = calculateLifecycleMaturity(lifecycle);

  return (
    <section aria-labelledby="engineering-lifecycle-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="engineering-lifecycle-heading"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            Engineering Lifecycle
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Completed phases are based on the project&apos;s current recorded
            progress.
          </p>
        </div>
        <p className="text-sm font-semibold text-slate-700">
          {completedCount} of {engineeringLifecyclePhases.length} phases complete
        </p>
      </div>

      <div
        className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label="Engineering lifecycle completion"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={maturity}
      >
        <div
          className="h-full rounded-full bg-slate-950"
          style={{ width: `${maturity}%` }}
        />
      </div>

      <ol className="mt-5 grid gap-3 sm:grid-cols-2">
        {engineeringLifecyclePhases.map((phase, index) => {
          const isComplete = lifecycle[phase];

          return (
            <li
              key={phase}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                isComplete
                  ? "border-slate-300 bg-slate-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isComplete
                    ? "bg-slate-950 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {isComplete ? "✓" : index + 1}
              </span>
              <span>
                <span className="block font-semibold text-slate-900">
                  {engineeringLifecycleLabels[phase]}
                </span>
                <span className="block text-xs text-slate-500">
                  {isComplete ? "Complete" : "Not complete"}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
