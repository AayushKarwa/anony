import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from 'zod'
import { usernameValidation } from "@/Schemas/signUpSchema";
import { NextResponse } from "next/server";
import { request } from "http";

const usernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(req:Request){

    await dbConnect();
    
    try {
        
        const {searchParams} = new URL(req.url)
        const queryParam = {
            username: searchParams.get('username')
        }
        //validate with zod

       const result = usernameQuerySchema.safeParse(queryParam)
       console.log(result)

       if(!result.success){
        const usernameError = result.error.format().username?._errors || []
        return Response.json({
            success: false,
            message: usernameError?.length>0 ? usernameError.join(',') : "Invalid query parameters"
        },{status:400})
       }

       const {username} = result.data

       const existingVerifiedUser = await UserModel.findOne({
        username,
        isVerified:true
       })
       if(existingVerifiedUser){

        return Response.json({
            success: false,
            message:"Username is already taken"
        },{status:400})
       }

       return Response.json({
        success: true,
        message:"Username is available"
    },{status:200})
        
        
    } catch (err) {
        console.log("Error checking username",err)
        return Response.json({
            success: false,
            message: "Error checking username"
        },{
            status:500,
        })
    }
}