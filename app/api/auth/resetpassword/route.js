import User from "@/models/user";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { token, newPassword } = await req.json();
  await connectDB()
  try {
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ message: "invalid token" });
    }

    console.log(user)
    user.password = newPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save()
    return NextResponse.json('password changed successfully',{status:200})
  } catch (error) {
    return NextResponse.json(error.message,{status:400})
  }
}
