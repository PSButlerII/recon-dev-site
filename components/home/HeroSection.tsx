"use client";

import { ArrowRight, CheckCircle2, Lightbulb, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { process } from "@/data/home";
import { ButtonLink } from "@/components/site/ButtonLink";

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
    >
      {children}
    </a>
  );
}

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
    >
      {children}
    </a>
  );
}

export function HeroSection() {
  return (
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
            Custom technical support for ideas that do not fit inside a
            template.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Recon Dev LLC helps small businesses, inventors, and hands-on
            operators turn messy problems into clear plans, working systems,
            useful documentation, and practical prototypes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
           <ButtonLink href="/contact">
              Request a consultation <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonLink>

            <ButtonLink href="/services" variant="secondary">
              Explore services
            </ButtonLink>
          </div>

          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {["IT Support", "Software Builds", "Prototype Planning"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 className="mb-2 h-5 w-5" />
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              )
            )}
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
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
                  Recon Method
                </p>
                <h3 className="mt-2 text-2xl font-bold">
                  From problem to working path
                </h3>
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

                  <p className="text-sm leading-6 text-slate-300">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}