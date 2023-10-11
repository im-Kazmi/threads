'use client'
import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { useAuthContext } from "@/context/AuthContext";

function Navbar(){
  const {user,logout,logoutLoading} = useAuthContext()

  if (!user || Object.keys(user).length === 0) {
    return null
  }
    return (
    <nav className="navbar flex max-h-[20px]" data-theme='light'>
      <div className=" navbar-start">
        <div className="font-bold text-black lg:fixed text-xl flex gap-3 ">
          <img src="/logo.png" className="w-8  h-8 m-auto" />
          <h1 className=" my-auto">NexTalk</h1>
        </div>
      </div>
      <div className="navbar-center w-[50%] flex gap-2">
        <form className="ml-5 w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="search everything"
              className="bg-base-200 placeholder:text-xs bg-opacity-40 w-[100%] outline-none rounded-lg px-5 py-2 pr-10"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <CiSearch />
            </div>
          </div>
        </form>
      </div>
      <div className=" navbar-end flex">
        <span className="text-2xl mr-3 cursor-pointer">
          <BiMessageSquareDetail />
        </span>
        <span className="text-2xl mr-3 cursor-pointer">
          <IoIosNotificationsOutline />
        </span>
        
        <div className="dropdown bg-white dropdown-bottom dropdown-end">
        <div tabIndex={0} className=" w-8 h-8  cursor-pointer rounded-full overflow-hidden">
         <img src={user?.avatar} />
        </div>
        <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Profile</a></li>
          <li><a>Settings</a></li>
          <li><a onClick={logout}>Logout</a> {logoutLoading &&<span className=" loading loading-spinner border-cyan-500 w-10 h-10"></span>}</li>
        </ul>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
