"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { submitContactForm } from "@/app/contact/actions";
import { FormAlert } from "@/components/site/FormAlert";
import { FormField } from "@/components/site/FormField";
import { FormSectionLabel } from "@/components/site/FormSectionLabel";
import { SubmitButton } from "@/components/site/SubmitButton";
import {
  budgetOptions,
  preferredContactOptions,
  projectTypeOptions,
  timelineOptions,
} from "@/data/intake";
import { formControlClass, textareaClass } from "@/lib/styles";

const initialState = {
  success: false,
  message: "",
  inquiryId: "",
};

export function ContactSection() {
  const [projectType, setProjectType] = useState("");
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
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
            Bring the goal, the blocker, and the context.
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            A useful inquiry does not need to be polished. Share what you want
            to accomplish, what is getting in the way, and what has already
            been tried.
          </p>

          <div className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                What happens next
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                After submitting an inquiry, Recon Dev reviews the project
                details, identifies blockers, and determines whether the request
                is a fit for support, research, planning, development, or
                prototype work.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Typical response window
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Most inquiries receive a response within 1–3 business days,
                depending on project complexity and current workload.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Best inquiries
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Clear goals, current blockers, links, screenshots, errors,
                existing tools, and examples help speed up the review.
              </p>
            </div>
          </div>
        </div>

        <form
          ref={formRef}
          action={formAction}
          onReset={() => setProjectType("")}
          className="rounded-3xl bg-white p-6 text-slate-950"
        >
          <h3 className="text-xl font-bold">Project inquiry</h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Use this form to explain what you are trying to build, fix,
            research, or understand. The more context you provide, the easier it
            is to identify a realistic next step.
          </p>

          <p className="mt-3 text-xs text-slate-500">
            Fields marked with <span className="font-semibold text-red-500">*</span>{" "}
            are required.
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

            <div className="mb-2">
              <FormSectionLabel>Contact Information</FormSectionLabel>
            </div>
            <input type="hidden" name="source" value="recon-dev-website" />

            <FormField label="Name" required hint="Please enter your full name.">
              <input
                name="name"
                className={formControlClass}
                placeholder="Name"
                type="text"
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

            <FormField
              label="Email"
              required
              hint="Recon Dev will use this to respond to your inquiry."
            >
              <input
                name="email"
                className={formControlClass}
                placeholder="Email"
                type="email"
                required
              />
            </FormField>

            <FormField
              label="Phone number"
              hint="Optional. Include it only if phone or text is a good way to reach you."
            >
              <input
                name="phone"
                className={formControlClass}
                placeholder="Phone number"
                type="tel"
                maxLength={20}
                pattern="\+?[0-9\s\-\.\(\)]{7,20}"
              />
            </FormField>

            <FormField
              label="Preferred contact method"
              hint="Choose the best first follow-up method."
            >
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
            </FormField>

            <div className="mt-6 mb-2">
              <FormSectionLabel className="mt-6">Project Details</FormSectionLabel>
            </div>

            <FormField
              label="Project type"
              required
              hint="Choose the closest option. If none fit, select Other."
            >
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
            </FormField>

            {projectType === "Other" ? (
              <FormField
                label="Project type details"
                required
                hint="Briefly describe the type of work you need."
              >
                <input
                  name="projectTypeOther"
                  className={formControlClass}
                  placeholder="Briefly describe the project type"
                  type="text"
                  required
                />
              </FormField>
            ) : null}

            <FormField
              label="Project goal"
              required
              hint="What are you trying to build, fix, research, or understand?"
            >
              <textarea
                name="goal"
                className={textareaClass}
                placeholder="Describe the outcome you want."
                required
              />
            </FormField>

            <FormField
              label="Current blocker"
              hint="What is currently blocking progress?"
            >
              <textarea
                name="blocker"
                className={textareaClass}
                placeholder="Share errors, unknowns, constraints, or decisions that are stuck."
              />
            </FormField>

            <div className="mt-6 mb-2">
              <FormSectionLabel className="mt-6">Additional Context</FormSectionLabel>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <FormField
                label="Budget"
                hint="A rough range helps keep recommendations realistic."
              >
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

              <FormField
                label="Timeline"
                hint="When do you hope to make progress or complete the work?"
              >
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

            <FormField
              label="Extra details"
              hint="Links, screenshots, notes, existing tools, and examples are useful."
            >
              <textarea
                name="message"
                className={textareaClass}
                placeholder="Extra details, links, notes, or anything else useful"
              />
            </FormField>

            {state.message ? (
              <FormAlert
                success={state.success}
                message={state.message}
                referenceId={state.inquiryId}
              />
            ) : null}

            <p className="text-xs leading-5 text-slate-500">
              By submitting this form, you agree that Recon Dev LLC may use the
              information provided to review your inquiry and respond. Do not
              include passwords, payment details, private keys, or other
              sensitive secrets. See the{" "}
              <Link
                href="/privacy"
                prefetch={false}
                className="font-semibold text-slate-950 underline"
              >
                Privacy Policy
              </Link>{" "}
              for more information.
            </p>

            <SubmitButton isPending={isPending} pendingText="Sending inquiry...">
              Submit project inquiry
            </SubmitButton>

            <p className="text-center text-xs text-slate-500">
              No automated sales spam. Responses come directly from Recon Dev.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
