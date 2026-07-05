import { Badge } from "@/components/site/Badge";
import type { LabProjectStatus } from "@/data/labs";

type Props = {
  status: LabProjectStatus;
};

const colors: Record<LabProjectStatus, string> = {
  Concept: "bg-slate-100 text-slate-700",
  Research: "bg-blue-100 text-blue-700",
  Prototype: "bg-amber-100 text-amber-700",
  "Active Development": "bg-green-100 text-green-700",
  "Internal Tool": "bg-violet-100 text-violet-700",
  "Client Work / In Progress": "bg-orange-100 text-orange-700",
  Production: "bg-emerald-100 text-emerald-700",
  Archived: "bg-slate-200 text-slate-500",
};

export function LabStatusBadge({ status }: Props) {
  return (
    <Badge className={colors[status]}>
      {status}
    </Badge>
  );
}