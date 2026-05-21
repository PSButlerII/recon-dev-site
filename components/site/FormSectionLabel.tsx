type FormSectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function FormSectionLabel({
  children,
  className = "",
}: FormSectionLabelProps) {
  return (
    <div className={`mb-2 ${className}`}>
      <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
        {children}
      </h4>
    </div>
  );
}