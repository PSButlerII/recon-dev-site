import type { ContactInquiry } from "@/types/intake";

export type ParsedContactForm = Omit<
  ContactInquiry,
  "inquiryId" | "submittedAt"
> & {
  website: string;
};

function limitText(value: string, maxLength: number) {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

export function parseContactForm(formData: FormData): ParsedContactForm {
  const name = limitText(String(formData.get("name") || "").trim(), 120);
  const email = limitText(String(formData.get("email") || "").trim(), 180);
  const company = limitText(String(formData.get("company") || "").trim(), 180);
  const phone =limitText(String(formData.get("phone") || "").trim(),15);

  const projectType = limitText(
    String(formData.get("projectType") || "").trim(),
    120
  );

  const projectTypeOther = limitText(
    String(formData.get("projectTypeOther") || "").trim(),
    180
  );

  const finalProjectType = limitText(
    projectType === "Other" && projectTypeOther
      ? `Other: ${projectTypeOther}`
      : projectType,
    200
  );

  const goal = limitText(String(formData.get("goal") || "").trim(), 2000);
  const blocker = limitText(String(formData.get("blocker") || "").trim(), 2000);
  const budget = limitText(String(formData.get("budget") || "").trim(), 120);
  const timeline = limitText(String(formData.get("timeline") || "").trim(), 120);

  const preferredContact = limitText(
    String(formData.get("preferredContact") || "").trim(),
    120
  );

  const message = limitText(String(formData.get("message") || "").trim(), 3000);

  const source = limitText(
    String(formData.get("source") || "recon-dev-website").trim(),
    120
  );

  const website = limitText(
    String(formData.get("website") || "").trim(),
    50
  );

  return {
    website,
    source,
    name,
    email,
    phone,
    company,
    projectType: finalProjectType,
    goal,
    blocker,
    budget,
    timeline,
    preferredContact,
    message,
  };
}