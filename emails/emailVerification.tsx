import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Container,
} from '@react-email/components';

interface VerificationEmailProps {
  BASE_URL: string;
  username: string;
  otp: string;
}

export default function VerificationEmail({ BASE_URL, username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here’s your verification code: {otp}</Preview>
      <Container style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
        <Section style={{ textAlign: 'center', backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px' }}>
          <Row>
            <Heading as="h2" style={{ color: '#333' }}>Hello {username},</Heading>
          </Row>
          <Row>
            <Text style={{ fontSize: '16px', color: '#555' }}>
              Thank you for registering. Please use the following verification code to complete your registration:
            </Text>
          </Row>
          <Row>
            <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>{otp}</Text>
          </Row>
          <Row>
            <Text style={{ fontSize: '14px', color: '#777' }}>This code will expire in 15 minutes.</Text>
          </Row>
          <Row>
            <Button
              href={`${BASE_URL}/verify/${username}`}
              style={{
                backgroundColor: '#007bff',
                color: '#ffffff',
                padding: '10px 20px',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '16px',
              }}
            >
              Verify Account
            </Button>
          </Row>
          <Row>
            <Text style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
              If you did not request this code, please ignore this email.
            </Text>
          </Row>
        </Section>
      </Container>
    </Html>
  );
}
