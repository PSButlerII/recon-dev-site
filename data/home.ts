import {
  ClipboardCheck,
  Code2,
  Factory,
  FileText,
  MonitorCog,
  ShieldCheck,
} from "lucide-react";

export const services = [
  {
    icon: MonitorCog,
    title: "IT Support & Systems Help",
    summary:
      "Practical help with devices, accounts, workflows, local systems, software setup, and small business technology problems.",
    tags: ["Troubleshooting", "Setup", "Workflow support"],
  },
  {
    icon: Code2,
    title: "Web & Software Development",
    summary:
      "Custom websites, internal tools, dashboards, forms, databases, and small applications built around the way your work actually happens.",
    tags: ["React", "Next.js", ".NET", "Databases"],
  },
  {
    icon: ShieldCheck,
    title: "Basic Security Review",
    summary:
      "A plain-language review of accounts, devices, access control, backups, and practical steps to reduce risk.",
    tags: ["2FA", "Access control", "Backups"],
  },
  {
    icon: Factory,
    title: "Prototyping & Fabrication Planning",
    summary:
      "Early-stage support for physical ideas, 3D printing, mechanical planning, diagrams, parts research, and prototype documentation.",
    tags: ["3D printing", "Planning", "Documentation"],
  },
  {
    icon: FileText,
    title: "Research & Documentation",
    summary:
      "Turn scattered information into usable guides, technical notes, project plans, checklists, and decision documents.",
    tags: ["Research", "Guides", "Reports"],
  },
  {
    icon: ClipboardCheck,
    title: "Quality Review & Debugging",
    summary:
      "Find what is broken, explain why it is happening, test fixes, and document the next best step without unnecessary jargon.",
    tags: ["QA", "Testing", "Root-cause analysis"],
  },
];

export const process = [
  {
    title: "Ask simple questions",
    text: "We start with the root objective: what are you trying to achieve, what is blocking you, and what would a useful result look like?",
  },
  {
    title: "Research and map the problem",
    text: "We gather requirements, review tools, compare options, and separate assumptions from facts before building anything expensive.",
  },
  {
    title: "Build a practical solution",
    text: "We create the simplest working version first, then test, document, and improve it based on real use.",
  },
  {
    title: "Refine and support",
    text: "After the first version works, we clean up the rough edges, improve reliability, and make sure you understand how to use it.",
  },
];

export const packages = [
  {
    name: "Starter Support",
    audience: "For small fixes and first-time clients",
    price: "$35/hr",
    features: [
      "Remote or local troubleshooting",
      "Simple website or app edits",
      "Account/device setup support",
      "Plain-language recommendations",
    ],
  },
  {
    name: "Project Buildout",
    audience: "For small businesses and inventors building something real",
    price: "Scoped quote",
    featured: true,
    features: [
      "Discovery and requirements breakdown",
      "Web app, workflow, or prototype planning",
      "Build, test, and iterate approach",
      "Documentation and handoff support",
    ],
  },
  {
    name: "Systems Review",
    audience: "For businesses that need clarity before changing tools",
    price: "Assessment-based",
    features: [
      "Review current tools and workflows",
      "Identify bottlenecks and risk areas",
      "Create a prioritized improvement plan",
      "Optional implementation support",
    ],
  },
];

export const projectTypes = [
  "Business websites",
  "Internal dashboards",
  "Customer intake forms",
  "Document workflows",
  "Local network and device setup",
  "Prototype research",
  "3D printing support",
  "Security checklists",
  "Technical guides",
];

export const projectFitItems = [
  {
    title: "Small businesses needing technical direction",
    description:
      "Support for operators who need systems, websites, troubleshooting, process improvements, or help organizing technical work.",
  },
  {
    title: "Startups and early-stage ideas",
    description:
      "Research, planning, documentation, prototyping guidance, and practical next steps before scaling complexity.",
  },
  {
    title: "Inventors and hands-on builders",
    description:
      "Technical assistance for projects involving software, electronics, fabrication planning, automation, or custom workflows.",
  },
  {
    title: "Teams dealing with unclear technical problems",
    description:
      "Useful when the issue is difficult to define, spans multiple systems, or needs investigation before implementation.",
  },
];

