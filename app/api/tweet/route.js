import { getCurrentUser } from "@/actions/backend/auth/getUser";
import { getTweets } from "@/actions/backend/tweets/getTweets";
import Tweet from "@/models/tweet";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  try {
      const user = await getCurrentUser();

      const tweets = await getTweets()
   
    return NextResponse.json(tweets, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
