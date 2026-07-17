"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/site/BrandLogo";
import { ButtonLink } from "@/components/site/ButtonLink";
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/data/site";

function NavLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`relative text-sm font-medium transition ${
        active ? "text-slate-950" : "text-slate-600 hover:text-slate-950"
      }`}
    >
      {children}

      {active ? (
        <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-slate-950" />
      ) : null}
    </Link>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <BrandLogo />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              active={pathname === item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/contact">Start a Project</ButtonLink>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="rounded-xl border border-slate-200 p-2 md:hidden"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {mobileOpen ? (
        <nav
          className="flex flex-col gap-4 border-t border-slate-200 bg-white px-5 py-5 md:hidden"
          aria-label="Mobile primary"
        >
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              active={pathname === item.href}
            >
              {item.label}
            </NavLink>
          ))}
          <ButtonLink href="/contact">Start a Project</ButtonLink>
        </nav>
      ) : null}
    </header>
  );
}
