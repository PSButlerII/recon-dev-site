import {
  calculateLifecycleMaturity,
  type EngineeringLifecycle,
} from "@/data/engineering-lifecycle";

type LabMaturityBarProps = {
  lifecycle: EngineeringLifecycle;
};

export function LabMaturityBar({ lifecycle }: LabMaturityBarProps) {
  const maturity = calculateLifecycleMaturity(lifecycle);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>Maturity</span>
        <span>{maturity}%</span>
      </div>

      <div className="h-2 rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-slate-950"
          style={{ width: `${maturity}%` }}
        />
      </div>
    </div>
  );
}