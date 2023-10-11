import mongoose, { connection } from "mongoose";

export async function connectDB(){
    try {
        if(connection.readyState === 1){
            console.log('already connected')
        }else{
            await mongoose.connect(process.env.MONGO_URI)
            if(connection.readyState === 1){
             console.log('connected to database successfully')
            }
        }

    } catch (error) {
        console.log(error.message)
    }
}