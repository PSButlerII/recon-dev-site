type InfoCardProps = {
  title: string;
  text: string;
};

export function InfoCard({ title, text }: InfoCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold tracking-tight text-slate-950">
        {title}
      </h2>

      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </article>
  );
}