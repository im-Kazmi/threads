"use client";
import Sidebar from "@/components/Sidebar";
import SideBarItems from "@/components/SideBarItems";
import UpdateProfile from "@/components/UpdateProfile";
import FriendRequests from "@/components/FriendRequests";
import Stories from "@/components/Stories";
import PostForm2 from "@/components/PostForm2";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Tweets from "@/components/Tweets";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const {user,loading} = useAuthContext()


  if (!user || Object.keys(user).length === 0) {
    return (
      <div className="flex w-full h-screen ">
        <img src="/logo.png" className="w-12 h-12 m-auto animate-spin" />
      </div>
    )}

    useEffect(()=>{
      if (!loading && !user || Object.keys(user).length === 0) {
        router.push('/auth/login')
      }
    },[user])
    
    return (
    <div className="min-h-screen min-w-screen " data-theme="light"  >
      <div className="flex w-full">
        <div className="w-1/6 max-sm:hidden">
          <Sidebar bg={"white"}>
            <div className="w-[100%] h-full fixed">
              <SideBarItems />
            </div>
          </Sidebar>
        </div>

        <div className="flex w-4/6 gap-5 max-sm:w-full ">
          <div className="z-10 flex flex-col justify-center w-2/3 px-3 py-2 pt-5 mt-5 ml-5 max-sm:w-full rounded-t-xl bg-base-200 max-sm:ml-0 max-sm:p-3">
            <Stories />
            <PostForm2 />
            <Tweets />
          </div>
          <div className="w-1/3 py-5 mt-5 h-fit max-sm:hidden rounded-xl bg-base-200">
            <div className="flex flex-col ">
              <UpdateProfile />
              <FriendRequests />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
