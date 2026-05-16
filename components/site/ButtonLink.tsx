import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const variants = {
    primary:
      "bg-slate-950 text-white hover:bg-slate-800",
    secondary:
      "border border-slate-300 bg-white text-slate-950 hover:bg-slate-100",
    light:
      "bg-white text-slate-950 hover:bg-slate-100",
  };

  return (
    <Link
      href={href}
      prefetch={false}
      className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}