type LabKnownLimitationsProps = {
  limitations: string[];
};

export function LabKnownLimitations({
  limitations,
}: LabKnownLimitationsProps) {
  if (limitations.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        Known Limitations
      </h2>
      <ul className="mt-5 space-y-3">
        {limitations.map((limitation) => (
          <li
            key={limitation}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 leading-7 text-slate-600"
          >
            {limitation}
          </li>
        ))}
      </ul>
    </section>
  );
}
