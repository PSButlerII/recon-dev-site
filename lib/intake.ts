import type { ContactInquiry } from "@/types/intake";

export function toJsonPayload(inquiry: ContactInquiry) {
  return JSON.stringify(inquiry, null, 2);
}

export function toJsonLine(inquiry: ContactInquiry) {
  return JSON.stringify(inquiry);
}

export function toEmailSubject(inquiry: ContactInquiry) {
  return `[${inquiry.inquiryId}] New Recon Dev inquiry from ${inquiry.name}`;
}

export function toCrmPayload(inquiry: ContactInquiry) {
  return {
    ...inquiry,
    status: "new",
    priority: "normal",
  };
}