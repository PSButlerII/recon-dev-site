import type { LabTradeoff } from "@/data/labs";

type LabTradeoffsProps = {
  tradeoffs: LabTradeoff[];
};

export function LabTradeoffs({ tradeoffs }: LabTradeoffsProps) {
  if (tradeoffs.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        Tradeoffs
      </h2>
      <dl className="mt-5 space-y-3">
        {tradeoffs.map((item) => (
          <div
            key={`${item.choice}-${item.reason}`}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <dt className="font-bold text-slate-950">{item.choice}</dt>
            <dd className="mt-2 leading-7 text-slate-600">{item.reason}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
