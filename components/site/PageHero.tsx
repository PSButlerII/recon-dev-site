import { SectionHeading } from "@/components/site/SectionHeading";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

export function PageHero({ eyebrow, title, children }: PageHeroProps) {
  return (
    <section className="border-b border-slate-200 bg-white px-5 py-20">
      <SectionHeading eyebrow={eyebrow} title={title}>
        {children}
      </SectionHeading>
    </section>
  );
}