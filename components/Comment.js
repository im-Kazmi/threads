import React from 'react'
import { AiFillHeart} from "react-icons/ai";


const Comment = ({comment}) => {
  return (
    <div className='w-full flex flex-col gap-2'>
      <div className='flex'>
        <img src={comment?.author?.avatar} className='w-8 h-8 rounded-full' />
        <div className='flex flex-col ml-2'>
            <h1 className='text-sm text-primary flex gap-5'>{comment?.author?.firstname + " " + comment?.author?.lastname}<span className='text-xs text-gray-500'>2h</span> </h1> 
            <p className='text-xs  text-gray-600'>{comment?.content}</p>
            <div className='flex gap-5'>
              <span className='cursor-pointer flex text-xs p-1 rounded-full bg-base-300'><AiFillHeart className='text-sm m-auto  rounded-full text-red-500' />12</span>
              <h1 className='text-xs text-primary my-auto'>reply</h1>
              <span className='text-lg text-gray-500 cursor-pointer'>...</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Comment