import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "dark";
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-slate-100 text-slate-600",
    dark: "bg-white/10 text-slate-300",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}