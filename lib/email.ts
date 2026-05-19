import { Resend } from "resend";
import { ContactInquiryEmail } from "@/components/emails/ContactInquiryEmail";
import type { ContactInquiry } from "@/types/intake";
import { getEmailConfig } from "@/lib/env";
import { toEmailSubject } from "@/lib/intake";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactInquiryEmail(inquiry: ContactInquiry) {
  const emailConfig = getEmailConfig();

  if (!emailConfig.valid) {
    return {
      success: false,
      message: emailConfig.message,
    };
  }

  const { error } = await resend.emails.send({
    from: emailConfig.fromEmail,
    to: [emailConfig.toEmail],
    replyTo: inquiry.email,
    subject: toEmailSubject(inquiry),
    react: ContactInquiryEmail(inquiry),
  });

  if (error) {
    return {
      success: false,
      message: "Something went wrong sending the inquiry. Please try again.",
      error,
    };
  }

  return {
    success: true,
    message: "Email sent.",
  };
}