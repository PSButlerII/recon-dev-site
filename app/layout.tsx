import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recon Dev LLC | Research, Build, Support",
  description:
    "Recon Dev LLC provides practical IT support, web development, systems review, research documentation, and prototype planning for small businesses, startups, inventors, and hands-on operators.",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
  keywords: [
    "Recon Dev LLC",
    "IT support",
    "web development",
    "software development",
    "technical support",
    "prototype planning",
    "systems review",
    "small business technology support",
  ],
  authors: [{ name: "Recon Dev LLC" }],
  creator: "Recon Dev LLC",
  openGraph: {
    title: "Recon Dev LLC | Research, Build, Support",
    description:
      "Practical technical help for small businesses, inventors, startups, and hands-on operators.",
    type: "website",
    locale: "en_US",
    siteName: "Recon Dev LLC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}