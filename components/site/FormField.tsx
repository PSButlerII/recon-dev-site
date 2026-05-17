import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  children: ReactNode;
  hint?: string;
};

export function FormField({ label, children, hint }: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      {children}

      {hint ? (
        <span className="mt-1.5 block text-xs leading-5 text-slate-500">
          {hint}
        </span>
      ) : null}
    </label>
  );
}