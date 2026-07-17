type LabFutureImprovementsProps = {
  improvements: string[];
};

export function LabFutureImprovements({
  improvements,
}: LabFutureImprovementsProps) {
  if (improvements.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        Future Improvements
      </h2>
      <ul className="mt-5 space-y-3">
        {improvements.map((improvement) => (
          <li
            key={improvement}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 leading-7 text-slate-600"
          >
            {improvement}
          </li>
        ))}
      </ul>
    </section>
  );
}
