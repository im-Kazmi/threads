import User from "@/models/user"
import { connectDB } from "@/utils/connectDB"
import { sendEmail } from "@/utils/mailer"
import { NextResponse } from "next/server"

export async function POST(req){
    const {email} = await req.json()
    await connectDB()
    try {
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json('user with this email does not exists')
        }
        await sendEmail(email,'RESET',user._id)
        return NextResponse.json('password reset email sent seccess',{status:200})
    } catch (error) {
        return NextResponse.json(error.message,{status:400})
    }
}