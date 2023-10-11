import { getCurrentUser } from "@/actions/backend/auth/getUser"
import { getTweets } from "@/actions/backend/tweets/getTweets"
import Comment from "@/models/comment"
import Tweet from "@/models/tweet"
import { NextResponse } from "next/server"

export async function POST(req,{params}){
    const {id} = params
    const {content} = await req.json()
    try {
        const user = await getCurrentUser()
        if(!user){
            return NextResponse.json('UN-AUTHENTICATED!!!')
        }

        const tweet = await Tweet.findById(id)

        const newComment = new Comment({
            author:user._id,
            content
        })

        await newComment.save()

        tweet.comments.push(newComment._id)

        await tweet.save()

        return NextResponse.json({
            message:"commented addedd successfully",
            tweets:await getTweets()
        },{status:200})
        
    } catch (error) {
        return NextResponse.json(error.message,{status:400})
        
    }
}