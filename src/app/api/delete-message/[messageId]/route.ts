import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function DELETE(req:Request, {params}:{params:{messageId:string}}){
    const messageId = params.messageId;
    await dbConnect();
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User;

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{status:401})
    }

    try {
      const updatedResult =  await UserModel.updateOne(
            {_id: user._id},
            {$pull:{messages:{_id:messageId}}}

        )

        if(updatedResult.modifiedCount === 0){
            return Response.json({
                success:false,
                message:"Message not found or already deleted"
            },{status:404})
        }

        return Response.json({
            success:true,
            message:"Message deleted successfully"
        },{status:200})

    } catch (error) {
        console.log('errror in delete message',error)
        return Response.json({
            success:false,
            message:"Failed to delete the message"
        },{status:500})
    }
   


}