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

export const engineeringLifecycleLabels: Record<
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

export function calculateLifecycleMaturity(
  lifecycle: EngineeringLifecycle
) {
  const completed = engineeringLifecyclePhases.filter(
    (phase) => lifecycle[phase]
  ).length;

  return Math.round((completed / engineeringLifecyclePhases.length) * 100);
}