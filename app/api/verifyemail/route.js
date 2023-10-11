import { connectDB } from "@/utils/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB()
  const { token } = await req.json();
  try {
    const user = await User.findOne({VerifyToken:token,VerifyTokenExpiry:{$gt:Date.now()}})

    if(!user){
        return NextResponse.json({message:"invalid Token please retry"},{status:400})
    }

    user.isVerified = true
    user.VerifyToken = undefined
    user.VerifyTokenExpiry = undefined

    await user.save()
    return NextResponse.json({message:"email verified successfully"},{status:200})
  } catch (error) {
    return NextResponse.json(error.message,{status:400})
  }
}
