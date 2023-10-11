import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export const serverAuth = async (req) => {
  const session = await getToken(req);
  console.log('session',session)
  if (!session) {
    throw new Error("not signed in");
  }
  const currentUser = await User.findOne({email:session?.user?.email})
  if(!currentUser){
    throw new Error('not signed in')
  }
  return {currentUser}
};

export default serverAuth