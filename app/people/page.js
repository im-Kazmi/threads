"use client";
import BigSidebar from "@/components/BigSidebar";
import UserCard from "@/components/UserCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true)
        const { data } = await axios.get("/api/users");
        setUsers(data);
        setLoading(false)
      } catch (error) {
        console.log(error?.message)
      }
    }
    getUsers()
  }, []);

  if(loading) return (
    <BigSidebar>
      <div className=" w-full h-[1200px]   " >
          <h1 className="font-bold text-xl text-black">People you may know</h1>
          <div className="w-full flex flex-wrap mt-4 gap-3">
            {[1,2,3,4,5,6,7,8,9,10].map((i)=>(
            <UserCard loading={loading} />
            ))}
            </div>
        </div>
    </BigSidebar>
  )
  return (
    <div>
      <BigSidebar>
        <div className=" w-full h-full min-h-screen  " >
          <h1 className="font-bold text-xl text-black">People you may know</h1>
          <div className="w-full h-full flex flex-wrap mt-4 gap-3">
          {users?.map((user) => (
            <UserCard  user={user} users={users} setUsers={setUsers} />
          ))}
            </div>
        </div>
      </BigSidebar>
    </div>
  );
};



export default page;
