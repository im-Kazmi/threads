import { getCurrentUser } from "@/actions/backend/auth/getUser";
import { getTweets } from "@/actions/backend/tweets/getTweets";
import Tweet from "@/models/tweet";
import { connectDB } from "@/utils/connectDB";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const { text, images } = await req.json();

  const user = await getCurrentUser();

  try {
    const imagesUrls = await Promise.all(
      images.map(async (image) => {
        return uploadToCloudinary(image);
      })
    );

    const newTweet = new Tweet({
      author: user._id,
      text,
      images: imagesUrls,
    });
    await newTweet.save();
    return NextResponse.json({
      message:"posted successfully",
      tweets: await getTweets()
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
