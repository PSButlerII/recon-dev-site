const submissionTimestamps = new Map<string, number>();

export function canSubmit(identifier: string, cooldownMs = 15_000) {
  const now = Date.now();
  const lastSubmission = submissionTimestamps.get(identifier);

  if (lastSubmission && now - lastSubmission < cooldownMs) {
    return false;
  }

  submissionTimestamps.set(identifier, now);

  return true;
}