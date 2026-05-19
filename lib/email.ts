import { Resend } from "resend";
import { ContactInquiryEmail } from "@/components/emails/ContactInquiryEmail";
import type { ContactInquiry } from "@/types/intake";
import { getEmailConfig } from "@/lib/env";
import { toEmailSubject } from "@/lib/intake";
import { logError } from "@/lib/logger";

const resend = new Resend(process.env.RESEND_API_KEY);

export type SendEmailResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export async function sendContactInquiryEmail(
  inquiry: ContactInquiry
): Promise<SendEmailResult> {
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
    logError("Resend contact form error", error);

    return {
      success: false,
      message: "Something went wrong sending the inquiry. Please try again.",
    };
  }

  return {
    success: true,
    message: "Email sent.",
  };
}