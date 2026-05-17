"use server";

import { Resend } from "resend";
import { ContactInquiryEmail } from "@/components/emails/ContactInquiryEmail";
import type { ContactInquiry } from "@/types/intake";
import { toCrmPayload, toEmailSubject } from "@/lib/intake";
import { sendInquiryToCrm } from "@/lib/crm";
import { canSubmit } from "@/lib/security";
import { parseContactForm } from "@/lib/parse-contact-form";

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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const { website, ...parsedInquiry } = parseContactForm(formData);

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

  if (!isValidEmail(parsedInquiry.email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  if (!canSubmit(parsedInquiry.email)) {
    return {
      success: false,
      message: "Please wait a moment before submitting another inquiry.",
    };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      success: false,
      message: "Email service is not configured. Missing RESEND_API_KEY.",
    };
  }

  if (!process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
    return {
      success: false,
      message:
        "Email service is not configured. Missing contact email settings.",
    };
  }

  const inquiryId = generateInquiryId();

  const inquiry: ContactInquiry = {
    inquiryId,
    ...parsedInquiry,
    submittedAt: new Date().toISOString(),
  };

  console.log("New Recon Dev inquiry:", inquiry);
  console.log("CRM Payload:", toCrmPayload(inquiry));

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL,
    to: [process.env.CONTACT_TO_EMAIL],
    replyTo: inquiry.email,
    subject: toEmailSubject(inquiry),
    react: ContactInquiryEmail(inquiry),
  });

  if (error) {
    console.error("Resend contact form error:", error);

    return {
      success: false,
      message: "Something went wrong sending the inquiry. Please try again.",
    };
  }

  try {
    await sendInquiryToCrm(inquiry);
  } catch (error) {
    console.error("CRM sync failed:", error);
  }

  return {
    success: true,
    message: `Inquiry sent. Recon Dev will review the project details. Reference ID: ${inquiryId}`,
    inquiryId,
  };
}