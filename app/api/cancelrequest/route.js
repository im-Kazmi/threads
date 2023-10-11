import { getCurrentUser } from "@/actions/backend/auth/getUser";
import { getAllUsers } from "@/actions/backend/users/getAllUsers";
import User from "@/models/user";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB()
        const {recieverId} = await req.json()
       const user = await getCurrentUser()
       if(!user){
        return NextResponse.json('UN-AUTHORIZED!!!',{status:400})
       }

       const sender = await User.findById(user._id)
       const reciever = await User.findById(recieverId)


       sender.requestSent.filter((req)=> req !== reciever._id)   
       reciever.requestsRecieved.filter((req)=> req !== sender._id)   

       await sender.save()
       await reciever.save()
       
       return NextResponse.json({
        message:"request cancelled successfully",
        users:await getAllUsers()
       })
    } catch (error){
        return NextResponse.json(error.message,{status:400})
        
    }
}