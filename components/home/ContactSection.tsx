"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContactForm } from "@/app/contact/actions";
import { FormField } from "@/components/site/FormField";
import { formControlClass, textareaClass } from "@/lib/styles";
import {
  budgetOptions,
  preferredContactOptions,
  projectTypeOptions,
  timelineOptions,
} from "@/data/intake";
import { FormSectionLabel } from "@/components/site/FormSectionLabel";
import { FormAlert } from "@/components/site/FormAlert";
import { SubmitButton } from "@/components/site/SubmitButton";
import Link from "next/link";

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
          <div className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                What happens next
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                After submitting an inquiry, Recon Dev reviews the project details,
                identifies blockers, and determines whether the request is a good fit for
                consultation, support, research, development, or prototype planning.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Typical response window
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Most inquiries receive a response within 1–3 business days depending on
                project complexity and current workload.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Best inquiries
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Clear goals, current blockers, links, screenshots, technical details, and
                examples help accelerate planning and troubleshooting.
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
            Use this form to explain what you are trying to build, fix, research, or
            understand. The more context you provide, the easier it is to identify the
            right next step.
          </p>

            <p className="mt-3 text-xs text-slate-500">
              Fields marked with <span className="font-semibold text-red-500">*</span> are required.
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

            <FormField label="Name" required hint="Please enter your full name">
            <input
              name="name"
              className={formControlClass}
              placeholder="Name"
              type="text"              
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

            <FormField label="Email" required hint="We'll use this to contact you about your inquiry">
            <input
              name="email"
              className={formControlClass}
              placeholder="Email"
              type="email"
            />
            </FormField>

            <FormField label="phone Number">
            <input
              name="phone"
              className={formControlClass}
              placeholder="enter your phone number"
              type="tel"
              maxLength={14}
              minLength={10}
              pattern="\+?[0-9\s\-\.\(\)]{7,20}" 
            />
            </FormField>

            <select
              name="preferredContact"
              className={formControlClass}
              defaultValue=""
              required
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

            <div className="mt-6 mb-2">
              <FormSectionLabel className="mt-6">Project Details</FormSectionLabel>
            </div>

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
              className={textareaClass}
              placeholder="Briefly describe the project type"
              type="text"
              required
              />
              </FormField>
            ) : null}

            <FormField label="Project Goal" hint="What are you trying to build, fix, or understand?">
            <textarea
              name="goal"
              className={textareaClass}
              placeholder="What are you trying to build, fix, or understand?"
              required
            />
            </FormField>

            <FormField label="Current Blocker" hint="What is currently blocking progress?">

            <textarea
              name="blocker"
              className={textareaClass}
              placeholder="What is currently blocking progress?"
            />
            </FormField>

            <div className="mt-6 mb-2">
              <FormSectionLabel className="mt-6">Additional Context</FormSectionLabel>
            </div>
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



            <textarea
              name="message"
              className={formControlClass}
              placeholder="Extra details, links, notes, or anything else useful"
            />

            {state.message ? (
              <FormAlert
              success={state.success}
              message={state.message}
              referenceId={state.inquiryId}
              />):null}  

              <p className="text-xs leading-5 text-slate-500">
                By submitting this form, you agree that Recon Dev LLC may use the information
                provided to review your inquiry and respond. See the{" "}
              <Link
                href="/privacy"
                prefetch={false}
                className="font-semibold text-slate-950 underline"
              >
                Privacy Policy
              </Link>
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
