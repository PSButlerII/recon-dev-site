import { trustStripItems } from "@/data/trust-strip";
import { ContentSection } from "@/components/site/ContentSection";

const items = [
  {
    label: "Research-first",
    text: "Understand before building",
  },
  {
    label: "Small-team friendly",
    text: "Built for practical budgets",
  },
  {
    label: "Digital + physical thinking",
    text: "Software, systems, and prototypes",
  },
  {
    label: "Clear next steps",
    text: "Documentation, planning, and execution",
  },
];

export function TrustStrip() {
  return (
    <ContentSection background="white" className="border-y border-slate-200">
        <div className="grid gap-4 py-6 md:grid-cols-4">
          {trustStripItems.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-sm font-bold text-slate-950">{item.label}</p>
              <p className="mt-1 text-xs text-slate-500">{item.text}</p>
            </div>
          ))}
        </div>
     </ContentSection>
  );
}