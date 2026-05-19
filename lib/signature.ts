import crypto from "crypto";

export function createHmacSignature({
  body,
  timestamp,
  secret,
}: {
  body: string;
  timestamp: string;
  secret: string;
}) {
  return crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest("hex");
}