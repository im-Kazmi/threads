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
       console.log('reciever = ',reciever)

       const isAlreadySentRequest =  reciever.requestsRecieved.includes(sender._id)
      console.log(isAlreadySentRequest)
       if(isAlreadySentRequest){
        return NextResponse.json('friend request already sent to this user',{status:400})
       }

       sender.requestSent.push(recieverId)   
       reciever.requestsRecieved.push(sender._id)   

       await sender.save()
       await reciever.save()
       
       return NextResponse.json({
        message:"request sent successfully",
        users:await getAllUsers()
       })
    } catch (error){
        return NextResponse.json(error.message,{status:400})
        
    }
}