type LabLessonsProps = {
  lessons: string[];
};

export function LabLessons({ lessons }: LabLessonsProps) {
  if (lessons.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        Lessons Learned
      </h2>

      <ul className="mt-5 space-y-3">
        {lessons.map((lesson) => (
          <li
            key={lesson}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 leading-7 text-slate-600"
          >
            {lesson}
          </li>
        ))}
      </ul>
    </section>
  );
}