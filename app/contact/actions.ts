"use server";

import { Resend } from "resend";
import { ContactInquiryEmail } from "@/components/emails/ContactInquiryEmail";

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
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const company = String(formData.get("company") || "").trim();

  const projectType = String(formData.get("projectType") || "").trim();
  const projectTypeOther = String(formData.get("projectTypeOther") || "").trim();

  const finalProjectType =
    projectType === "Other" && projectTypeOther
      ? `Other: ${projectTypeOther}`
      : projectType;

  const goal = String(formData.get("goal") || "").trim();
  const blocker = String(formData.get("blocker") || "").trim();
  const budget = String(formData.get("budget") || "").trim();
  const timeline = String(formData.get("timeline") || "").trim();
  const preferredContact = String(formData.get("preferredContact") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const website = String(formData.get("website") || "").trim();
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
  const inquiry = {
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

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL,
    to: [process.env.CONTACT_TO_EMAIL],
    replyTo: email,
    subject: `[${inquiryId}] New Recon Dev inquiry from ${name}`,
    react: ContactInquiryEmail(inquiry),
  });

  if (error) {
    console.error("Resend contact form error:", error);

    return {
      success: false,
      message: "Something went wrong sending the inquiry. Please try again.",
    };
  }

  return {
    success: true,
    message: `Inquiry sent. Recon Dev will review the project details. Reference ID: ${inquiryId}`,
    inquiryId,
  };
}