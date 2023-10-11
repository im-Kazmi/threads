import { getCurrentUser } from "@/actions/backend/auth/getUser";
import { getAllUsers } from "@/actions/backend/users/getAllUsers";
import User from "@/models/user";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        await connectDB()
        const users = await  getAllUsers()
        console.log(users)
       return NextResponse.json(users,{status:200})
    } catch (error) {
       return NextResponse.json(error.message,{status:400})
    }
}