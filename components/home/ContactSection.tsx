"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContactForm } from "@/app/contact/actions";


const initialState = {
  success: false,
  message: "",
  inquiryId: "",
};
export function ContactSection() {
  const [projectType, setProjectType] = useState("");
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
  if (state.success) {
    formRef.current?.reset();
    setProjectType("");
  }
}, [state.success]);
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

        <form ref={formRef} action={formAction} className="rounded-3xl bg-white p-6 text-slate-950">
          <h3 className="text-xl font-bold">Project inquiry</h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            This form currently logs inquiries to the server console. Next, we
            can connect it to email or a database.
          </p>

          <div className="mt-5 space-y-3">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <input type="hidden" name="source" value="recon-dev-website" />
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

            <input
              name="company"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
              placeholder="Company / Organization"
              type="text"
            />

            <select
              name="projectType"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
              required
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
            >
              <option value="" disabled>
                Project type
              </option>
              <option value="Website">Website</option>
              <option value="Web Application">Web Application</option>
              <option value="IT Support">IT Support</option>
              <option value="Systems Review">Systems Review</option>
              <option value="Security Review">Security Review</option>
              <option value="Research / Documentation">Research / Documentation</option>
              <option value="Prototype Planning">Prototype Planning</option>
              <option value="Not Sure Yet">Not Sure Yet</option>
              <option value="Other">Other</option>
            </select>
            {projectType === "Other" ? (
              <input
                name="projectTypeOther"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
                placeholder="Briefly describe the project type"
                type="text"
                required
              />
            ) : null}

            <textarea
              name="goal"
              className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
              placeholder="What are you trying to build, fix, or understand?"
              required
            />

            <textarea
              name="blocker"
              className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
              placeholder="What is currently blocking progress?"
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <select
                name="budget"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
                defaultValue=""
              >
                <option value="" disabled>
                  Budget range
                </option>
                <option value="Under $250">Under $250</option>
                <option value="$250 - $750">$250 - $750</option>
                <option value="$750 - $1,500">$750 - $1,500</option>
                <option value="$1,500 - $5,000">$1,500 - $5,000</option>
                <option value="$5,000+">$5,000+</option>
                <option value="Not Sure">Not Sure</option>
              </select>

              <select
                name="timeline"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
                defaultValue=""
              >
                <option value="" disabled>
                  Timeline
                </option>
                <option value="ASAP">ASAP</option>
                <option value="1 - 2 Weeks">1 - 2 Weeks</option>
                <option value="1 Month">1 Month</option>
                <option value="2 - 3 Months">2 - 3 Months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            <select
              name="preferredContact"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
              defaultValue=""
            >
              <option value="" disabled>
                Preferred contact method
              </option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="Text">Text</option>
              <option value="Video Call">Video Call</option>
            </select>

            <textarea
              name="message"
              className="min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
              placeholder="Extra details, links, notes, or anything else useful"
            />

            {state.message ? (
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  state.success
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <p>{state.message}</p>

                {state.success && state.inquiryId ? (
                  <p className="mt-1 font-mono text-xs">
                    Save this reference: {state.inquiryId}
                  </p>
                ) : null}
              </div>
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