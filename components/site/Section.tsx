import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  background?: "default" | "white";
};

export function Section({
  children,
  className = "",
  background = "default",
}: SectionProps) {
  const backgroundClass = background === "white" ? "bg-white" : "";

  return (
    <section className={`${backgroundClass} py-20 ${className}`}>
      {children}
    </section>
  );
}