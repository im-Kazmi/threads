import Tweet from "@/models/tweet"

export const getTweets = async() =>{
    try {
        const tweets = await Tweet.find()
        .populate('author')
        .populate({
            path:'comments',
            populate:{
                path:"author",
                model:'User'
            }
        }).sort('-createdAt')
        return tweets
    } catch (error) {
        console.log(error.message)
    }
}