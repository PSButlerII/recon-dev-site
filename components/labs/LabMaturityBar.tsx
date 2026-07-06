type LabMaturityBarProps = {
  maturity: number;
};

export function LabMaturityBar({ maturity }: LabMaturityBarProps) {
  const safeMaturity = Math.max(0, Math.min(100, maturity));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>Maturity</span>
        <span>{safeMaturity}%</span>
      </div>

      <div className="h-2 rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-slate-950"
          style={{ width: `${safeMaturity}%` }}
        />
      </div>
    </div>
  );
}