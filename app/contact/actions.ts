"use server";

import { Resend } from "resend";
import { ContactInquiryEmail } from "@/components/emails/ContactInquiryEmail";

export type ContactFormState = {
  success: boolean;
  message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill out your name, email, and project message.",
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
      message: "Email service is not configured. Missing contact email settings.",
    };
  }

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL,
    to: [process.env.CONTACT_TO_EMAIL],
    replyTo: email,
    subject: `New Recon Dev inquiry from ${name}`,
    react: ContactInquiryEmail({
      name,
      email,
      message,
    }),
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
    message: "Inquiry sent. Recon Dev will review the project details.",
  };
}