import Link from "next/link";
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_0.7fr]">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              {siteConfig.name}
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-slate-600">
              {siteConfig.description}
            </p>

            <div className="mt-5 space-y-1 text-sm text-slate-500">
              <p>{siteConfig.location}</p>

              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="hover:text-slate-950"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>

          <nav
            className="grid grid-cols-2 gap-1 sm:grid-cols-3"
            aria-label="Footer primary"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="text-sm text-slate-600 transition hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>

          <nav className="flex flex-wrap items-center gap-4" aria-label="Legal">
            {siteConfig.footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="transition hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
