export const engineeringLifecyclePhases = [
  "discovery",
  "research",
  "planning",
  "prototype",
  "validation",
  "documentation",
  "release",
  "maintenance",
] as const;

export type EngineeringLifecyclePhase =
  (typeof engineeringLifecyclePhases)[number];

export type EngineeringLifecycle = Record<EngineeringLifecyclePhase, boolean>;

export const engineeringLifecyclePhaseLabels: Record<
  EngineeringLifecyclePhase,
  string
> = {
  discovery: "Discovery",
  research: "Research",
  planning: "Planning",
  prototype: "Prototype",
  validation: "Validation",
  documentation: "Documentation",
  release: "Release",
  maintenance: "Maintenance",
};

export const engineeringLifecyclePhaseDescriptions: Record<
  EngineeringLifecyclePhase,
  string
> = {
  discovery: "Define the problem, constraints, users, and success criteria.",
  research: "Review options, risks, dependencies, and unknowns before building.",
  planning: "Map scope, sequencing, technical approach, and practical next steps.",
  prototype: "Create a small working version or proof path when it is useful.",
  validation: "Test assumptions, usability, reliability, and fit before release.",
  documentation: "Capture decisions, setup notes, tradeoffs, and handoff details.",
  release: "Prepare a usable version for the intended environment or audience.",
  maintenance: "Track follow-up support, fixes, refinements, and lifecycle care.",
};

export const defaultEngineeringLifecycle: EngineeringLifecycle = {
  discovery: true,
  research: true,
  planning: true,
  prototype: false,
  validation: false,
  documentation: true,
  release: false,
  maintenance: false,
};
