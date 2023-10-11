import User from "@/models/user";
import { connectDB } from "@/utils/connectDB";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getCurrentUser(){
    await connectDB()
    const token =  await cookies().get('token').value
    const decodedToken = await jwt.decode(token,process.env.JWT_SECRET)
    
    const user = await User.findById(decodedToken.id).populate('requestsRecieved')

    return user
}