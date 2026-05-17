import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

type BrandLogoProps = {
  variant?: "light" | "dark";
};

export function BrandLogo({
  variant = "dark",
}: BrandLogoProps) {
  const logoSrc =
    variant === "light"
      ? siteConfig.logo
            : siteConfig.logo;

  return (
    <Link
      href="/"
      prefetch={false}
      className="flex items-center gap-3"
    >
      <Image
        src={logoSrc}
        alt={siteConfig.name}
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
        priority
      />

      <div>
        <p className="text-base font-bold leading-none">
          {siteConfig.name}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {siteConfig.tagline}
        </p>
      </div>
    </Link>
  );
}