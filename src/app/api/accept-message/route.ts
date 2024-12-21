import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function POST(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session?.user) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Not Authenticated",
      }),
      { status: 401 }
    );
  }

  const userId = user._id;
  const body = await req.json();
  console.log("Request Body:", body);

  const { acceptMessage } = body;

  if (acceptMessage === undefined) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "acceptMessage is required",
      }),
      { status: 400 }
    );
  }

  try {
   
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessage },
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Failed to update user status to accept messages",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message acceptance status updated successfully",
        updatedUser,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error details:", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while updating the status",
      }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session?.user) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Not Authenticated",
      }),
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessages,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in getting message acceptance status", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while retrieving the status",
      }),
      { status: 500 }
    );
  }
}
