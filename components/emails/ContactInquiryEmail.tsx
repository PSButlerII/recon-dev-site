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
  name: string;
  email: string;
  message: string;
};

export function ContactInquiryEmail({
  name,
  email,
  message,
}: ContactInquiryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Recon Dev inquiry from {name}</Preview>

      <Body style={{ backgroundColor: "#f8fafc", fontFamily: "Arial, sans-serif" }}>
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            padding: "32px",
            borderRadius: "16px",
          }}
        >
          <Heading>New Recon Dev Inquiry</Heading>

          <Text>
            <strong>Name:</strong> {name}
          </Text>

          <Text>
            <strong>Email:</strong> {email}
          </Text>

          <Hr />

          <Section>
            <Text>
              <strong>Message:</strong>
            </Text>

            <Text style={{ whiteSpace: "pre-wrap" }}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}