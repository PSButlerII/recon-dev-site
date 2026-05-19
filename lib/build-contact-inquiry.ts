import type { ContactInquiry } from "@/types/intake";
import type { ParsedContactForm } from "@/lib/parse-contact-form";

export function generateInquiryId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `RD-${timestamp}-${random}`;
}

export function buildContactInquiry(
  parsedInquiry: Omit<ParsedContactForm, "website">
): ContactInquiry {
  return {
    inquiryId: generateInquiryId(),
    ...parsedInquiry,
    submittedAt: new Date().toISOString(),
  };
}