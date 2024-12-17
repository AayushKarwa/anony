import * as React from 'react';
import {
    Html,
    Head,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from '@react-email/components';

interface VerificationEmailProps {
    username: string,
    otp: string
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps){
    return (
        <Html lang="en" dir="ltr">
        <Head>
            <title>Verification Code</title>
            
        </Head>
        <Preview>
            Here&apos;s your Verification code: {otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello {username},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering. Please use the following verification code to complete you registration:
                    </Text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
                <Row>
                    <Text>If you did not request this code, Please ignore this email.</Text>
                </Row>
                <Row>
                    <Button href={`http://localhost:3000/verify/${username}`} style={{color: '#61dafb'}}>Verify here</Button>
                </Row>
                
            </Section>
      </Html>
    )
}