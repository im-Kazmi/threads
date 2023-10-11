import { connectDB } from "@/utils/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import {cookies} from 'next/headers'
import jwt from 'jsonwebtoken'

export async function POST(req){
    const {email,password} = await req.json()
    try {
        await connectDB()

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({message:"Invalid credentials"},{status:400})
        }
        
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return NextResponse.json({message:"Invalid credentials"},{status:400})
        }
        
        const token = await jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:"7d"})

        await cookies().set('token',token,{
            path:"/"
        })
        return NextResponse.json({
            token,
            user
        },{status:200})
    } catch (error) {
       return NextResponse.json({message:error.message},{status:400})
    }
}