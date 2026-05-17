import { SectionHeading } from "@/components/site/SectionHeading";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

export function PageHero({ eyebrow, title, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white px-5 py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10rem] top-[-10rem] h-[22rem] w-[22rem] rounded-full bg-slate-200/50 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-[-10rem] h-[22rem] w-[22rem] rounded-full bg-slate-300/30 blur-3xl" />
      </div>

      <div className="relative">
        <SectionHeading eyebrow={eyebrow} title={title}>
          {children}
        </SectionHeading>
      </div>
    </section>
  );
}