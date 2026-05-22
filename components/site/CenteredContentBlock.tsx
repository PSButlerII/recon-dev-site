type CenteredContentBlockProps = {
  eyebrow: string;
  title: string;
  text: string;
};

export function CenteredContentBlock({
  eyebrow,
  title,
  text,
}: CenteredContentBlockProps) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h2>

      <p className="mt-5 leading-8 text-slate-600">{text}</p>
    </div>
  );
}