"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/site/Container";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/site/ButtonLink";
import { BrandLogo } from "@/components/site/BrandLogo";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <ButtonLink href="/contact">Start a Project</ButtonLink>

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
       <div className="flex flex-col gap-4">
          {siteConfig.nav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>
      ) : null}
    </header>
  );
}