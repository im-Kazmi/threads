import mongoose, { Mongoose } from "mongoose";

const storySchema = new mongoose.Schema({
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        required:true
    },
    contentType:{
        type:String,
        enum:['image','video','text'],
        required:true
    },
    content:{
        type:String,
        required:true
    },
    views: {
        type: Number,
        default: 0
      },
      likes: {
        type: Number,
        default: 0
      },
},{timestamps:true})

const Story = mongoose.models.Story || mongoose.model('Story',storySchema)

export default Story