import { getCurrentUser } from "@/actions/backend/auth/getUser"
import { getTweets } from "@/actions/backend/tweets/getTweets"
import Tweet from "@/models/tweet"
import { NextResponse } from "next/server"

export async function POST(req,{params}){
    const {id} = params
    try {
        const user = await getCurrentUser()
        const tweet = await Tweet.findById(id)

        const AlreadyLiked = tweet.likes.includes(user._id)

        if(AlreadyLiked){
            return NextResponse.json('already Liked')
        }

        tweet.likes.push(user._id)
        await tweet.save()

        return NextResponse.json({
            message:"like success",
            tweets:await getTweets()
        },{status:200})
        
    } catch (error) {
        return NextResponse.json(error.message,{status:400})
        
    }
}