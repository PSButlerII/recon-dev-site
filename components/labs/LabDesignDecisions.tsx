import type { LabDesignDecision } from "@/data/labs";

type LabDesignDecisionsProps = {
  decisions: LabDesignDecision[];
};

export function LabDesignDecisions({ decisions }: LabDesignDecisionsProps) {
  if (decisions.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        Design Decisions
      </h2>
      <dl className="mt-5 space-y-3">
        {decisions.map((item) => (
          <div
            key={`${item.title}-${item.decision}`}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <dt className="font-bold text-slate-950">{item.title}</dt>
            <dd className="mt-2 leading-7 text-slate-600">{item.decision}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
