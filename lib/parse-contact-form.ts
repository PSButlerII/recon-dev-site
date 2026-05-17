import type { ContactInquiry } from "@/types/intake";

function limitText(value: string, maxLength: number) {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

export function parseContactForm(formData: FormData) {
  const name = limitText(String(formData.get("name") || "").trim(), 120);
  const email = limitText(String(formData.get("email") || "").trim(), 180);
  const company = limitText(String(formData.get("company") || "").trim(), 180);

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

  const website = String(formData.get("website") || "").trim();

  return {
    website,
    source,
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
  };
}