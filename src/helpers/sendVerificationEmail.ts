import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/emailVerification";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
    email:string,
    verifycode:string,
    username:string,

):Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'anony | verification code',
            react: VerificationEmail({username,otp:verifycode}),
          });
        return {success:true,message:"verification email sent successfully"}
    } catch (emailError) {
        console.log("Error sending verification email", emailError)
        return {success:false,message:"failed to send verification email"}
    }
}