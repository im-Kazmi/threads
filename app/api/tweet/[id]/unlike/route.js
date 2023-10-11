import { getCurrentUser } from "@/actions/backend/auth/getUser"
import { getTweets } from "@/actions/backend/tweets/getTweets"
import Tweet from "@/models/tweet"
import { NextResponse } from "next/server"

export async function POST(req,{params}){
    const {id} = params
    try {
        const user = await getCurrentUser()
        const tweet = await Tweet.findById(id)

        const liked = tweet.likes.includes(user._id)

        if(!liked){
            return NextResponse.json('not Liked')
        }

        tweet.likes.pull(user._id)
        await tweet.save()

        return NextResponse.json({
            message:"tweet unliked",
            tweets: await getTweets()
        },{status:200})
        
    } catch (error) {
        return NextResponse.json(error.message,{status:400})
        
    }
}