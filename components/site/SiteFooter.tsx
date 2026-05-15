import { Container } from "@/components/site/Container";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <Container className="flex flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Recon Dev LLC. All rights reserved.</p>

        <div className="flex flex-wrap gap-4">
          <Link href="/services" className="hover:text-slate-950">
            Services
          </Link>

          <Link href="/projects" className="hover:text-slate-950">
            Projects
          </Link>

          <Link href="/packages" className="hover:text-slate-950">
            Packages
          </Link>

          <Link href="/process" className="hover:text-slate-950">
            Process
          </Link>

          <Link href="/contact" className="hover:text-slate-950">
            Contact
          </Link>
        </div>
      </Container>
    </footer>
  );
}