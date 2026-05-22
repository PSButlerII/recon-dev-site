import type { ReactNode } from "react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";

type ContentSectionProps = {
  children: ReactNode;
  background?: "white" | "default";
  className?: string;
};

export function ContentSection({
  children,
  background = "default",
  className,
}: ContentSectionProps) {
  return (
    <Section background={background} className={className}>
      <Container>{children}</Container>
    </Section>
  );
}