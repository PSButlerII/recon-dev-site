"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Factory,
  FileText,
  Lightbulb,
  Menu,
  MonitorCog,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

const services = [
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

const packages = [
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

const process = [
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

const projectTypes = [
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

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-base leading-7 text-slate-600">{children}</p>}
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
      {children}
    </a>
  );
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
    >
      {children}
    </a>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
    >
      {children}
    </a>
  );
}

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviceFilter, setServiceFilter] = useState("All");

  const filters = ["All", "Software", "Support", "Security", "Prototype", "Research"];

  const filteredServices = useMemo(() => {
    if (serviceFilter === "All") return services;
    const key = serviceFilter.toLowerCase();

    return services.filter((service) => {
      const blob = `${service.title} ${service.summary} ${service.tags.join(" ")}`.toLowerCase();
      return blob.includes(key) || (key === "prototype" && blob.includes("3d"));
    });
  }, [serviceFilter]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-bold leading-none">Recon Dev LLC</p>
              <p className="mt-1 text-xs text-slate-500">Research. Build. Support.</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#process">Process</NavLink>
            <NavLink href="#packages">Packages</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          <div className="hidden md:block">
            <PrimaryButton href="#contact">Start a Project</PrimaryButton>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="rounded-xl border border-slate-200 p-2 md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#process">Process</NavLink>
              <NavLink href="#packages">Packages</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-slate-100 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                <Lightbulb className="h-4 w-4" />
                Practical technical help for builders, startups, and small teams.
              </div>
              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Custom technical support for ideas that do not fit inside a template.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Recon Dev LLC helps small businesses, inventors, and hands-on operators turn messy problems into clear plans, working systems, useful documentation, and practical prototypes.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="#contact">
                  Request a consultation <ArrowRight className="ml-2 h-4 w-4" />
                </PrimaryButton>
                <SecondaryButton href="#services">Explore services</SecondaryButton>
              </div>
              <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {["IT Support", "Software Builds", "Prototype Planning"].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <CheckCircle2 className="mb-2 h-5 w-5" />
                    <p className="text-sm font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-7 text-white shadow-2xl">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Recon Method</p>
                    <h3 className="mt-2 text-2xl font-bold">From problem to working path</h3>
                  </div>
                  <Wrench className="h-8 w-8 text-slate-300" />
                </div>
                <div className="space-y-4">
                  {process.map((step, index) => (
                    <div key={step.title} className="rounded-2xl bg-white/10 p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">
                          {index + 1}
                        </span>
                        <p className="font-semibold">{step.title}</p>
                      </div>
                      <p className="text-sm leading-6 text-slate-300">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading eyebrow="Services" title="Technical help without the corporate fog">
            Choose a focused service or combine support, software, documentation, and prototype planning into one practical project.
          </SectionHeading>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setServiceFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  serviceFilter === filter
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{service.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="process" className="border-y border-slate-200 bg-white px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Approach" title="Research first. Build second. Simplify always.">
              The goal is not to sell unnecessary complexity. The goal is to discover the right next step and make it usable.
            </SectionHeading>

            <div className="grid gap-5 md:grid-cols-4">
              {process.map((step, index) => (
                <div key={step.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Project fit</p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for the small teams doing real work.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Recon Dev is a fit when you need someone who can research, troubleshoot, document, build, test, and explain the work without hiding behind jargon.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {projectTypes.map((type) => (
                <div key={type} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold shadow-sm">
                  {type}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="packages" className="border-y border-slate-200 bg-white px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Packages" title="Start small, then scale what works">
              Pricing can stay hourly for simple support or become project-based when the scope is clear.
            </SectionHeading>

            <div className="grid gap-5 lg:grid-cols-3">
              {packages.map((item) => (
                <article
                  key={item.name}
                  className={`rounded-3xl border border-slate-200 p-7 shadow-sm ${
                    item.featured ? "bg-slate-950 text-white" : "bg-white"
                  }`}
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold">{item.name}</h3>
                    <p className={`mt-2 text-sm leading-6 ${item.featured ? "text-slate-300" : "text-slate-600"}`}>
                      {item.audience}
                    </p>
                  </div>
                  <p className="mb-6 text-3xl font-black">{item.price}</p>
                  <ul className="space-y-3">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-6">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-8 rounded-[2rem] bg-slate-950 p-8 text-white md:grid-cols-[1fr_0.8fr] md:p-12">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Contact</p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Bring the problem. We will map the path.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Send the objective, the current blocker, and what you have already tried. Recon Dev can help turn that into a plan, prototype, fix, or working system.
              </p>
            </div>

            <form className="rounded-3xl bg-white p-6 text-slate-950">
              <h3 className="text-xl font-bold">Project inquiry</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This is currently a front-end form. We can wire it to email, a database, or a client intake dashboard next.
              </p>
              <div className="mt-5 space-y-3">
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
                  placeholder="Name"
                  type="text"
                />
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
                  placeholder="Email"
                  type="email"
                />
                <textarea
                  className="min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
                  placeholder="What are you trying to build, fix, or understand?"
                />
                <button
                  type="button"
                  className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Send inquiry
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Recon Dev LLC. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#services" className="hover:text-slate-950">Services</a>
            <a href="#packages" className="hover:text-slate-950">Packages</a>
            <a href="#contact" className="hover:text-slate-950">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
