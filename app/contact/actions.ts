"use server";

import { Resend } from "resend";
import { ContactInquiryEmail } from "@/components/emails/ContactInquiryEmail";
import type { ContactInquiry } from "@/types/intake";
import {
  toCrmPayload,
  toEmailSubject,
} from "@/lib/intake";
import { sendInquiryToCrm } from "@/lib/crm";
import { canSubmit } from "@/lib/security";

export type ContactFormState = {
  success: boolean;
  message: string;
  inquiryId?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

function limitText(value: string, maxLength: number) {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

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
  const name = limitText(String(formData.get("name") || "").trim(), 120);
  const email = limitText(String(formData.get("email") || "").trim(), 180);
   if (!isValidEmail(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }
  if (!canSubmit(email)) {
  return {
    success: false,
    message:
      "Please wait a moment before submitting another inquiry.",
  };
}
  const company = limitText(String(formData.get("company") || "").trim(), 180);
  const goal = limitText(String(formData.get("goal") || "").trim(), 2000);
  const blocker = limitText(String(formData.get("blocker") || "").trim(), 2000);
  const message = limitText(String(formData.get("message") || "").trim(), 3000);
  const projectType = limitText(String(formData.get("projectType") || "").trim(), 120);
  const projectTypeOther = limitText(String(formData.get("projectTypeOther") || "").trim(),180);
  const finalProjectType = limitText(
    projectType === "Other" && projectTypeOther
      ? `Other: ${projectTypeOther}`
      : projectType,
    200
  );
  const budget = limitText(String(formData.get("budget") || "").trim(), 120);
  const timeline = limitText(String(formData.get("timeline") || "").trim(), 120);
  const preferredContact = limitText(String(formData.get("preferredContact") || "").trim(), 120);
  const website = limitText(String(formData.get("website") || "").trim(), 50);

  if (!name || !email || !finalProjectType || !goal) {
    return {
      success: false,
      message:
        "Please fill out your name, email, project type, and project goal.",
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

  if (website) {
    return {
      success: true,
      message: "Inquiry sent. Recon Dev will review the project details.",
    };
  }

  const inquiryId = generateInquiryId();

  const inquiry: ContactInquiry = {
    inquiryId,
    source: String(formData.get("source") || "recon-dev-website").trim(),
    name,
    email,
    company,
    projectType: finalProjectType,
    goal,
    blocker,
    budget,
    timeline,
    preferredContact,
    message,
    submittedAt: new Date().toISOString(),
  };

  console.log("New Recon Dev inquiry:", inquiry);
  console.log("CRM Payload:", toCrmPayload(inquiry));

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL,
    to: [process.env.CONTACT_TO_EMAIL],
    replyTo: email,
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