import type { LabProjectStatus } from "@/data/labs";

export const labStatusDefinitions: {
  status: LabProjectStatus;
  description: string;
}[] = [
  {
    status: "Concept",
    description: "An idea being explored or documented.",
  },
  {
    status: "Research",
    description: "Active investigation before committing to a build path.",
  },
  {
    status: "Prototype",
    description: "A working or partially working experiment.",
  },
  {
    status: "Active Development",
    description: "Currently being built, tested, or refined.",
  },
  {
    status: "Internal Tool",
    description: "Built primarily for Recon Dev operations.",
  },
  {
    status: "Client Work / In Progress",
    description: "Client-related work that is not yet a public case study.",
  },
  {
    status: "Production",
    description: "A completed or actively used project.",
  },
  {
    status: "Archived",
    description: "Paused, retired, or preserved for reference.",
  },
];