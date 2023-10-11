import User from "@/models/user";
import { getCurrentUser } from "../auth/getUser";

export async function getAllUsers(){
    try {
        const user = await getCurrentUser()
       const users = await User.find({_id:{$ne:user._id}})
       return users
    } catch (error) {
        console.log(error.message)
    }
}