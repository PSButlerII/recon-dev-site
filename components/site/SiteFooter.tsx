import { Container } from "@/components/site/Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <Container className="flex flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Recon Dev LLC. All rights reserved.</p>

        <div className="flex flex-wrap gap-4">
          <a href="/services" className="hover:text-slate-950">
            Services
          </a>
          <a href="/packages" className="hover:text-slate-950">
            Packages
          </a>
          <a href="/contact" className="hover:text-slate-950">
            Contact
          </a>
        </div>
      </Container>
    </footer>
  );
}