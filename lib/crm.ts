import type { ContactInquiry } from "@/types/intake";
import { toCrmPayload } from "@/lib/intake";

export async function sendInquiryToCrm(inquiry: ContactInquiry) {
  const crmUrl = process.env.CRM_INTAKE_URL;
  const crmApiKey = process.env.CRM_INTAKE_API_KEY;

  if (!crmUrl || !crmApiKey) {
    console.log("CRM intake not configured. Skipping CRM sync.");
    return;
  }

  const response = await fetch(crmUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${crmApiKey}`,
    },
    body: JSON.stringify(toCrmPayload(inquiry)),
  });

  if (!response.ok) {
    console.error("CRM intake sync failed:", {
      status: response.status,
      statusText: response.statusText,
    });
  }
}