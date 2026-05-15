"use client";

import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/site/Container";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
    >
      {children}
    </a>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <p className="text-base font-bold leading-none">Recon Dev LLC</p>
            <p className="mt-1 text-xs text-slate-500">
              Research. Build. Support.
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/process">Process</NavLink>
          <NavLink href="/packages">Packages</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Start a Project
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="rounded-xl border border-slate-200 p-2 md:hidden"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/process">Process</NavLink>
            <NavLink href="/packages">Packages</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}