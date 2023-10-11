import { getCurrentUser } from "@/actions/backend/auth/getUser";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {senderId} = await req.json()
  try {
    const loggedInUser = await getCurrentUser()
    const sender = await User.find(senderId)

    if(loggedInUser.requestRecieved.includes(senderId)){
        await User.updateOne({_id:senderId},{$pull:{requestSent:loggedInUser._id}})
        await User.updateOne({_id:loggedInUser._id},{$pull:{requestRecieved:senderId}})
    
        loggedInUser.friends.push(senderId);
        sender.friends.push(loggedInUser._id);
      }

    await sender.save();
    await loggedInUser.save();

    return NextResponse.json('accepted successfully')
  } catch (error) {
    return NextResponse.json(error.message,{status:400})

  }
}
