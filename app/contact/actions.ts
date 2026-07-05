"use server";

import { toCrmPayload } from "@/lib/intake";
import { sendInquiryToCrm } from "@/lib/crm";
import { canSubmit } from "@/lib/security";
import { parseContactForm } from "@/lib/parse-contact-form";
import { validateContactForm } from "@/lib/validate-contact-form";
import { logError, logInfo } from "@/lib/logger";
import { sendContactInquiryEmail } from "@/lib/email";
import { buildContactInquiry } from "@/lib/build-contact-inquiry";

export type ContactFormState = {
  success: boolean;
  message: string;
  inquiryId?: string;
};



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

  const validation = validateContactForm({
    website,
    ...parsedInquiry,
  });

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

const inquiry = buildContactInquiry(parsedInquiry);

  logInfo("New Recon Dev inquiry", inquiry);
  logInfo("CRM Payload", toCrmPayload(inquiry));

  const emailResult = await sendContactInquiryEmail(inquiry);

  if (!emailResult.success) {
  return {
    success: false,
    message: emailResult.message,
  };
}

  try {
    await sendInquiryToCrm(inquiry);
  } catch (error) {
    logError("CRM sync failed", error);
  }

  return {
    success: true,
    message:
      "Inquiry received. Recon Dev will review the details and follow up if the request is a good fit.",
    inquiryId: inquiry.inquiryId,
  };
}
