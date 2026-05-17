import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ContactInquiryEmailProps = {
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
  inquiryId: string;
};

function Field({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) return null;

  return (
    <Text>
      <strong>{label}:</strong> {value}
    </Text>
  );
}

export function ContactInquiryEmail({
  source,
  name,
  email,
  company,
  projectType,
  goal,
  blocker,
  budget,
  timeline,
  preferredContact,
  message,
  submittedAt,
  inquiryId,
}: ContactInquiryEmailProps) {
  const jsonPayload = JSON.stringify(
    {
      source,
      name,
      email,
      company,
      projectType,
      goal,
      blocker,
      budget,
      timeline,
      preferredContact,
      message,
      submittedAt,
      inquiryId,
    },
    null,
    2
  );

  return (
    <Html>
      <Head />
      <Preview>New Recon Dev inquiry from {name}</Preview>

      <Body style={{ backgroundColor: "#f8fafc", fontFamily: "Arial, sans-serif" }}>
        <Container
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            padding: "32px",
            borderRadius: "16px",
          }}
        >
          <Heading>New Recon Dev Inquiry</Heading>

          <Section>
            <Field label="Name" value={name} />
            <Field label="Email" value={email} />
            <Field label="Inquiry ID" value={inquiryId} />
            <Field label="Company / Organization" value={company} />
            <Field label="Project Type" value={projectType} />
            <Field label="Budget" value={budget} />
            <Field label="Timeline" value={timeline} />
            <Field label="Preferred Contact" value={preferredContact} />
            <Field label="Submitted At" value={submittedAt} />
          </Section>

          <Hr />

          <Section>
            <Text>
              <strong>Project Goal:</strong>
            </Text>
            <Text style={{ whiteSpace: "pre-wrap" }}>{goal}</Text>

            {blocker ? (
              <>
                <Text>
                  <strong>Current Blocker:</strong>
                </Text>
                <Text style={{ whiteSpace: "pre-wrap" }}>{blocker}</Text>
              </>
            ) : null}

            {message ? (
              <>
                <Text>
                  <strong>Extra Details:</strong>
                </Text>
                <Text style={{ whiteSpace: "pre-wrap" }}>{message}</Text>
              </>
            ) : null}
          </Section>

          <Hr />

          <Section>
            <Text>
              <strong>Structured Payload:</strong>
            </Text>

            <Text
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
                fontSize: "12px",
                backgroundColor: "#f1f5f9",
                padding: "16px",
                borderRadius: "12px",
              }}
            >
              {jsonPayload}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}