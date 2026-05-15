import {
  Code2,
  Cpu,
  FileText,
  MonitorCog,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export const projects = [
  {
    icon: Code2,
    title: "Custom Web Applications",
    summary:
      "Dashboards, intake tools, admin panels, client portals, forms, and workflow-focused web apps.",
    examples: ["Next.js apps", ".NET systems", "Database-backed tools"],
  },
  {
    icon: MonitorCog,
    title: "Small Business Systems",
    summary:
      "Technology setup and process improvement for small teams that need practical, maintainable systems.",
    examples: ["Device setup", "Account workflows", "Internal tools"],
  },
  {
    icon: ShieldCheck,
    title: "Security & Access Reviews",
    summary:
      "Plain-language review of basic security posture, account access, backups, and device practices.",
    examples: ["2FA setup", "Access cleanup", "Backup planning"],
  },
  {
    icon: Cpu,
    title: "Prototype Planning",
    summary:
      "Research, diagrams, parts lists, documentation, and early planning for physical or technical ideas.",
    examples: ["3D printing", "Electronics planning", "Fabrication research"],
  },
  {
    icon: FileText,
    title: "Research Dossiers",
    summary:
      "Structured research documents that turn scattered information into clear, usable next steps.",
    examples: ["Technical guides", "Decision docs", "How-to manuals"],
  },
  {
    icon: Wrench,
    title: "Debugging & Quality Review",
    summary:
      "Root-cause troubleshooting for software, hardware-adjacent systems, workflows, and project blockers.",
    examples: ["Bug review", "Testing notes", "Fix planning"],
  },
];