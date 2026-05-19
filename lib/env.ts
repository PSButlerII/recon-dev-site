type EmailConfigResult =
  | {
      valid: true;
      apiKey: string;
      toEmail: string;
      fromEmail: string;
    }
  | {
      valid: false;
      message: string;
    };

export function getEmailConfig(): EmailConfigResult {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey) {
    return {
      valid: false,
      message: "Email service is not configured. Missing RESEND_API_KEY.",
    };
  }

  if (!toEmail || !fromEmail) {
    return {
      valid: false,
      message:
        "Email service is not configured. Missing contact email settings.",
    };
  }

  return {
    valid: true,
    apiKey,
    toEmail,
    fromEmail,
  };
}