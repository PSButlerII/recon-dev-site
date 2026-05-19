import type { ParsedContactForm } from "@/lib/parse-contact-form";

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateContactForm(parsed: ParsedContactForm) {
  if (!parsed.name || !parsed.email || !parsed.projectType || !parsed.goal) {
    return {
      valid: false,
      message:
        "Please fill out your name, email, project type, and project goal.",
    };
  }

  if (!isValidEmail(parsed.email)) {
    return {
      valid: false,
      message: "Please enter a valid email address.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}