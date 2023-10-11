import { connectDB } from "@/utils/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";

export async function POST(req){
    const {firstname,lastname,email,password,avatar} = await req.json()
    try {
        await connectDB()

        const userAlreadyExists = await User.findOne({email})

        if(userAlreadyExists){
            return NextResponse.json({message:"user with this email already exists"},{status:400})
        }
        
        const imageUrl = await uploadToCloudinary(avatar,{width:1000,height:1000})

        const newUser = new User({
            firstname,
            lastname,
            email,
            password,
            avatar:imageUrl
        })
        await newUser.save()

        // sendEmail(email,'VERIFY',newUser._id)
        return NextResponse.json(newUser,{status:200})
    } catch (error) {
       return NextResponse.json({message:error.message},{status:400})
    }
}