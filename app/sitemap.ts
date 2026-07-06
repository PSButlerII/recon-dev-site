import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { labProjects } from "@/data/labs";

export default function sitemap(): MetadataRoute.Sitemap {
const staticRoutes = [
  "",
  "/services",
  "/projects",
  "/labs",
  "/packages",
  "/process",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
];

const labRoutes = labProjects.map((project) => `/labs/${project.slug}`);

const routes = [...staticRoutes, ...labRoutes];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}