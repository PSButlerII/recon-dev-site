"use server";

import { Resend } from "resend";
import { ContactInquiryEmail } from "@/components/emails/ContactInquiryEmail";
import type { ContactInquiry } from "@/types/intake";
import { toCrmPayload, toEmailSubject } from "@/lib/intake";
import { sendInquiryToCrm } from "@/lib/crm";
import { canSubmit } from "@/lib/security";
import { parseContactForm } from "@/lib/parse-contact-form";
import { validateContactForm } from "@/lib/validate-contact-form";
import { getEmailConfig } from "@/lib/env";
import { logError, logInfo } from "@/lib/logger";

export type ContactFormState = {
  success: boolean;
  message: string;
  inquiryId?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

function generateInquiryId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `RD-${timestamp}-${random}`;
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const { website, ...parsedInquiry } = parseContactForm(formData);
  const emailConfig = getEmailConfig();
  const validation = validateContactForm({
  website,
  ...parsedInquiry,
  
});

  if (website) {
    return {
      success: true,
      message: "Inquiry sent. Recon Dev will review the project details.",
    };
  }

  if (
    !parsedInquiry.name ||
    !parsedInquiry.email ||
    !parsedInquiry.projectType ||
    !parsedInquiry.goal
  ) {
    return {
      success: false,
      message:
        "Please fill out your name, email, project type, and project goal.",
    };
  }

  if (!validation.valid) {
    return {
      success: false,
      message: validation.message,
    };
  }

  if (!canSubmit(parsedInquiry.email)) {
    return {
      success: false,
      message: "Please wait a moment before submitting another inquiry.",
    };
  }

 

  if (!emailConfig.valid) {
    return {
      success: false,
      message: emailConfig.message,
    };
  }

  const inquiryId = generateInquiryId();

  const inquiry: ContactInquiry = {
    inquiryId,
    ...parsedInquiry,
    submittedAt: new Date().toISOString(),
  };

  logInfo("New Recon Dev inquiry", inquiry);
  logInfo("CRM Payload", toCrmPayload(inquiry));

  const { error } = await resend.emails.send({
    from: emailConfig.fromEmail,
    to: [emailConfig.toEmail],
    replyTo: inquiry.email,
    subject: toEmailSubject(inquiry),
    react: ContactInquiryEmail(inquiry),
  });

  if (error) {
    logError("Resend contact form error:", error);

    return {
      success: false,
      message: "Something went wrong sending the inquiry. Please try again.",
    };
  }

  try {
    await sendInquiryToCrm(inquiry);
  } catch (error) {
    logError("CRM sync failed:", error);
  }

  return {
    success: true,
    message: `Inquiry sent. Recon Dev will review the project details. Reference ID: ${inquiryId}`,
    inquiryId,
  };
}