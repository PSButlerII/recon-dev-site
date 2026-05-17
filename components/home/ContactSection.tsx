"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContactForm } from "@/app/contact/actions";
import { FormField } from "@/components/site/FormField";
import { formControlClass } from "@/lib/styles";
import {
  budgetOptions,
  preferredContactOptions,
  projectTypeOptions,
  timelineOptions,
} from "@/data/intake";

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
            <FormField label="Name" hint="Please enter your full name">
            <input
              name="name"
              className={formControlClass}
              placeholder="Name"
              type="text"
              required
            />
            </FormField>

            <FormField label="Email" hint="We'll use this to contact you about your inquiry">
            <input
              name="email"
              className={formControlClass}
              placeholder="Email"
              type="email"
              required
            />
            </FormField>

            <FormField label="Company / Organization">
            <input
              name="company"
              className={formControlClass}
              placeholder="Company / Organization"
              type="text"
            />
            </FormField>

            <select
              name="projectType"
              className={formControlClass}
              required
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
            >
              <option value="" disabled>
                Project type
              </option>
               {projectTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            </select>
            {projectType === "Other" ? (
            <FormField label="Project Type" hint="What type of project are you working on?">
              <input
              name="projectTypeOther"
              className={`${formControlClass} min-h-24`}
              placeholder="Briefly describe the project type"
              type="text"
              required
              />
              </FormField>
            ) : null}

            <FormField label="Project Goal" hint="What are you trying to build, fix, or understand?">
            <textarea
              name="goal"
              className={`${formControlClass} min-h-24`}
              placeholder="What are you trying to build, fix, or understand?"
              required
            />
            </FormField>

            <FormField label="Current Blocker" hint="What is currently blocking progress?">

            <textarea
              name="blocker"
              className={`${formControlClass} min-h-24`}
              placeholder="What is currently blocking progress?"
            />
            </FormField>


            <div className="grid gap-3 sm:grid-cols-2">
            <FormField label="Budget" hint="What is your budget range for this project?">
              <select
                name="budget"
                className={formControlClass}
                defaultValue=""
              >
                <option value="" disabled>
                  Budget range
                </option>                
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              </FormField>

              <FormField label="Timeline" hint="When do you hope to have this project completed?">

              <select
                name="timeline"
                className={formControlClass}
                defaultValue=""
              >
                <option value="" disabled>
                  Timeline
                </option>
                {timelineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              </FormField>
            </div>

            <select
              name="preferredContact"
              className={formControlClass}
              defaultValue=""
            >
              <option value="" disabled>
                Preferred contact method
              </option>
              {preferredContactOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              className={formControlClass}
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
              className={formControlClass}
            >
              {isPending ? "Sending..." : "Send inquiry"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}