import type { EngineeringLifecycle } from "@/data/engineering-lifecycle";
import { defaultEngineeringLifecycle } from "@/data/engineering-lifecycle";

export type LabArea = {
  title: string;
  summary: string;
  lifecycle: EngineeringLifecycle;
};

export const labAreas: LabArea[] = [
  {
    title: "Research / Prototype Work",
    summary:
      "Early technical exploration where the responsible next step may be a research note, parts list, prototype path, or decision document.",
    lifecycle: defaultEngineeringLifecycle,
  },
  {
    title: "Internal Builds",
    summary:
      "Small tools and systems used to improve Recon Dev workflows before any public-facing claims are made about outcomes.",
    lifecycle: {
      ...defaultEngineeringLifecycle,
      prototype: true,
      validation: true,
    },
  },
  {
    title: "In Progress",
    summary:
      "Work that is still being defined, tested, documented, or prepared before it is suitable for a public writeup.",
    lifecycle: {
      ...defaultEngineeringLifecycle,
      prototype: true,
    },
  },
];
