"use client";
import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";

const UserCard = ({ user,loading=false,setUsers}) => {
  const { user:loggedInUser } = useAuthContext();

  const handleAddFriend = async (recieverId) => {
    try {
      const {data} = await axios.post(`/api/addfriend`,{recieverId})
      setUsers(data.users)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
    {loading ? (<div className=" w-[180px] p-3 gap-3 flex flex-col h-[220px] bg-white animate-pulse shadow-lg rounded-lg">
      <span className={`w-[100px] h-[100px] rounded-full m-auto bg-base-300 bg-opacity-40`} />
      <h1 className="m-auto w-full px-5 py-2 rounded-xl bg-base-300 bg-opacity-40"></h1>
      <span className=" bg-base-300 bg-opacity-40 px-4 py-4 rounded-xl text-white " > </span>
    </div>)
    :

    (<div className="  cursor-pointer w-[180px] p-3 gap-3 flex flex-col h-[220px] bg-white shadow-lg rounded-lg">
      <img className={`w-[100px] h-[100px] rounded-full m-auto `} src={user.avatar} />
      <h1 className="m-auto text-sm">{user.firstname + " " + user.lastname}</h1>
        {loggedInUser.requestSent?.includes(user._id)
          ? <button className=" bg-red-400 px-3 py-2 rounded-xl text-white ">Cancel request</button>
          : <button onClick={() => handleAddFriend(user._id)}  className=" bg-primary px-3 py-2 rounded-xl text-white ">Add friend</button>}
    </div>)}
    </>
  );
};


export default UserCard;
