import type { ContactInquiry } from "@/types/intake";
import { toCrmPayload } from "@/lib/intake";
import { logError, logInfo } from "@/lib/logger";
import { createHmacSignature } from "@/lib/signature";

export async function sendInquiryToCrm(inquiry: ContactInquiry) {
  const crmUrl = process.env.CRM_INTAKE_URL;
  const crmApiKey = process.env.CRM_INTAKE_API_KEY;
  const crmSigningSecret = process.env.CRM_SIGNING_SECRET;

  if (!crmUrl || !crmApiKey) {
    logInfo("CRM intake not configured. Skipping CRM sync.", {
      inquiryId: inquiry.inquiryId,
    });

    return;
  }

  const body = JSON.stringify(toCrmPayload(inquiry));
  const timestamp = new Date().toISOString();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${crmApiKey}`,
    "X-Recon-Timestamp": timestamp,
  };

  if (crmSigningSecret) {
    headers["X-Recon-Signature"] = createHmacSignature({
      body,
      timestamp,
      secret: crmSigningSecret,
    });
  }

  const response = await fetch(crmUrl, {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) {
    logError("CRM intake sync failed", {
      inquiryId: inquiry.inquiryId,
      status: response.status,
      statusText: response.statusText,
    });
  }
}