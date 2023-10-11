import User from "@/models/user";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    // await connectDB()
    try {
        const user = await User.findById(params.id)
        return NextResponse.json(user,{status:200})
    } catch (error) {
        return NextResponse.json(error.message,{status:400})
        
    }
}