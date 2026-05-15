"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/contact/actions";

const initialState = {
  success: false,
  message: "",
};

export function ContactSection() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-20">
      <div className="grid gap-8 rounded-[2rem] bg-slate-950 p-8 text-white md:grid-cols-[1fr_0.8fr] md:p-12">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
            Contact
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Bring the problem. We will map the path.
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Send the objective, the current blocker, and what you have already
            tried. Recon Dev can help turn that into a plan, prototype, fix, or
            working system.
          </p>
        </div>

        <form action={formAction} className="rounded-3xl bg-white p-6 text-slate-950">
          <h3 className="text-xl font-bold">Project inquiry</h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            This form currently logs inquiries to the server console. Next, we
            can connect it to email or a database.
          </p>

          <div className="mt-5 space-y-3">
            <input
              name="name"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
              placeholder="Name"
              type="text"
              required
            />

            <input
              name="email"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
              placeholder="Email"
              type="email"
              required
            />

            <textarea
              name="message"
              className="min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
              placeholder="What are you trying to build, fix, or understand?"
              required
            />

            {state.message ? (
              <p
                className={`rounded-2xl px-4 py-3 text-sm ${
                  state.success
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {state.message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Sending..." : "Send inquiry"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}