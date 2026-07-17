"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/site/Container";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/site/ButtonLink";
import { BrandLogo } from "@/components/site/BrandLogo";
import { usePathname } from "next/navigation";

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
        {/* <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
            <Sparkles className="h-5 w-5" /> 
          </div>

          <div>
            <p className="text-base font-bold leading-none">{siteConfig.name}</p>
            <p className="mt-1 text-xs text-slate-500">
              {siteConfig.tagline}
            </p>
          </div>
        </Link> */}
          <BrandLogo />
        <nav className="hidden items-center gap-7 md:flex">
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

        <ButtonLink href="/contact">Start a Project</ButtonLink>

        <button
          type="button"
          aria-label={mobileOpen ? "Close main menu" : "Open main menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          className="rounded-xl border border-slate-200 p-2 md:hidden"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {mobileOpen ? (
       <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="flex flex-col gap-4"
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
        </nav>
      ) : null}
    </header>
  );
}
