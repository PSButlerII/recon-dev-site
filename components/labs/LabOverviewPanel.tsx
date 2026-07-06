import { LabCategorySummary } from "@/components/labs/LabCategorySummary";
import { LabStats } from "@/components/labs/LabStats";
import { LabStatusSummary } from "@/components/labs/LabStatusSummary";

export function LabOverviewPanel() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Labs Overview
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
          A living index of ideas, prototypes, and internal systems.
        </h2>

        <p className="mt-4 leading-7 text-slate-600">
          Labs includes concepts, experiments, research directions, active
          builds, internal tools, and client-related work that may eventually
          become case studies, services, or products.
        </p>
      </div>

      <div className="mt-8">
        <LabStats />
        <LabStatusSummary />
        <LabCategorySummary />
      </div>
    </div>
  );
}