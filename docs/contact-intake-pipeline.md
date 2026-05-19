# Contact Intake Pipeline

## Current Flow

```txt
Website Contact Form
  -> Server Action
  -> Parse form data
  -> Honeypot spam check
  -> Validate required fields
  -> Rate limit by email
  -> Build ContactInquiry payload
  -> Send email through Resend
  -> Optionally sync to CRM
```

## Primary Files
```txt
components/home/ContactSection.tsx
app/contact/actions.ts
components/emails/ContactInquiryEmail.tsx
types/intake.ts
lib/parse-contact-form.ts
lib/validate-contact-form.ts
lib/build-contact-inquiry.ts
lib/email.ts
lib/crm.ts
lib/signature.ts
lib/intake.ts
lib/security.ts
```

# CRM Sync

## CRM sync is optional. It only runs when these variables are configured:
```txt
CRM_INTAKE_URL=
CRM_INTAKE_API_KEY=
CRM_SIGNING_SECRET=
Security Notes

The CRM endpoint should use:

HTTPS only
Bearer token validation
HMAC signature validation
timestamp/replay protection
payload validation
payload size limits
duplicate inquiryId protection
server-side logging
rate limiting
```

# CRM Payload
```txt
type WebsiteInquiryPayload = {
  inquiryId: string;
  source: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  goal: string;
  blocker?: string;
  budget?: string;
  timeline?: string;
  preferredContact?: string;
  message?: string;
  submittedAt: string;
  status: "new";
  priority: "normal";
};

This will save you pain later when we jump back into the CRM.
```