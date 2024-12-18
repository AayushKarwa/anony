import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(req:Request){
    await dbConnect();

    try {
        const {username,code} = await req.json()
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({
            username:decodedUsername
        })

        if(!user){
            return Response.json({
                success:false,
                message:"User Not Found"
            },{status:500})
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry)> new Date()

        if(isCodeNotExpired && isCodeValid){
            user.isVerified = true;
            await user.save();

            return Response.json({
                success:true,
                message:"Account verified successfully"
            },{status:201})
        }else if(!isCodeNotExpired){
            return Response.json({
                success:false,
                message:"Verification Code is expired. Please sign in again to get a new code"
            },{status:400})
        }else{
            return Response.json({
                success:false,
                message:"Incorrect verification code"
            },{status:400})
        }

        
    } catch (err) {
        return Response.json({
            success:false,
            message:"Error Verifying User"
        },{status:500})
    }
}