'use client'
import React, { useEffect, useState } from "react";
import { fakePost } from "@/fakedata/data";
import { AiFillHeart} from "react-icons/ai";
import {HiLocationMarker} from 'react-icons/hi'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import {TbShare2} from 'react-icons/tb'
import {LuBookmark} from 'react-icons/lu'
import Comments from "./Comments";
import { useAuthContext } from "@/context/AuthContext";
import { useTweetContext } from "@/context/TweetContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Tweets = () => {
  const [content,setContent] = useState('')

  const {user} = useAuthContext()
  const {tweets,handleTweetLikeAndUnlike,setTweets} = useTweetContext()

  const handleLike = async(res)=>{
    try {
      const res = await axios.post('/api/like')
      if(res.ok){
        return res.result
      }else{
        return null
      }
    } catch (error) {
      return error.message
    }
  }

  const handleFormSubmit = async (e,id) => {
    e.preventDefault()
    try {
      const {data} = await axios.post(`/api/tweet/${id}/addcomment`,{content})
      toast.success('comment posted')
      setTweets(data.tweets)
      setContent('')
    } catch (error) {
      console.log(error)
    }
  };

  const handleInputChange = (e)=>{
    setContent(e.target.value)
  }
  return (
    <>
      {tweets?.map((tweet)=>(
    <div key={tweet._id} className="w-ful my-2  flex flex-col pb-5 bg-white rounded-xl">
      <Toaster />
      <div className="m-5 ml-0 w-full px-5 flex justify-between">
        <div className="w-100 flex">
          <img
            src={tweet?.author?.avatar}
            className="w-8 h-8 rounded-full my-auto"
          />
          <div className="flex flex-col ml-5">
            <h1 className="font-bold">{tweet?.author?.firstname + " " + tweet?.author?.lastname }</h1>
            <h1 className="text-blue-400 text-xs flex"><HiLocationMarker /> Afghanistan</h1>
          </div>
        </div>
        <span><BiDotsHorizontalRounded className="text-2xl" /></span>
      </div>
      <div className="w-full p-5 pt-0 ">
        <p className="text-md mb-3  ">{tweet.text}</p>
        {tweet?.images?.map((img)=>(
        <img src={img} className="w-full  rounded-xl " />
        ))}
      </div>
      <div className="flex px-5 gap-6">
      <span className="flex  cursor-pointer rounded-xl gap-2 ">
        {tweet?.likes?.includes(user._id) ?
        <AiFillHeart onClick={()=> handleTweetLikeAndUnlike(tweet._id,'unlike')} className={`my-auto btn  btn-sm btn-circle text-red-400 text-xl`} />
      :<AiFillHeart onClick={()=> handleTweetLikeAndUnlike(tweet._id,'like')} className={`my-auto btn  btn-sm btn-circle text-gray-500 text-xl`} />
      
        }
        {tweet?.likes?.length}
        </span>
        <span className="flex  cursor-pointer rounded-xl gap-2 ">
          {tweet?.comments?.length}
        </span>
        <span className="flex  cursor-pointer rounded-xl gap-2 ">
          30 shares
        </span>
      </div>
      <hr className="w-full mt-3" />

      {/* <div className="w-full flex  justify-between px-5 mt-2">
        <div className='flex gap-5 '>
          <AiFillHeart className=" w-8  h-8 p-1 hover:bg-base-200 cursor-pointer rounded-full text-red-500" />
          <TbShare2 className="my-auto  w-8  h-8 p-1 hover:bg-base-200 cursor-pointer rounded-full text-gray-500" />
        </div>
        <LuBookmark />
      </div> */}
      <div className="px-5 mt-2 w-full gap-3 flex z-10">
        <img src={user.avatar} className="w-8 my-auto h-8 rounded-full" />
        <form onSubmit={(e)=>handleFormSubmit(e,tweet._id)} className="w-full flex gap-3">
            <input onChange={handleInputChange} value={content} type="text" placeholder="Write your comment" className="px-3 w-full py-2 bg-base-200 outline-none rounded-2xl" />
          <button type="submit" className=" btn btn-sm no-animation my-auto">post</button>
        </form>
      </div>
      <div  className=" mt-5">
      <Comments comments = {tweet?.comments} />
      </div>
    </div>
      ))}
    </>
  );
};

export default Tweets;
