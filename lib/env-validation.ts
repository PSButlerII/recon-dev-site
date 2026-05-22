const requiredEnvironmentVariables = [
  "RESEND_API_KEY",
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
];

export function validateEnvironment() {
  const missing = requiredEnvironmentVariables.filter(
    (key) => !process.env[key]
  );

  if (missing.length > 0) {
    console.error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}