import { useAuthContext } from '@/context/AuthContext'
import React from 'react'
import {MdOutlineNavigateNext} from 'react-icons/md'

const UpdateProfile = () => {
  const {user} = useAuthContext()
  
  return (
    <div className='bg-white cursor-pointer py-4 px-1 w-[90%] h-[200px] gap-2 rounded-xl mx-auto shadow-lg flex'>
        <div className='m-auto flex flex-col'>
            <img src={user?.avatar} className='w-10 h-10 rounded-full m-auto' />
            <h1 className='text-lg font-bold mt-1 mx-auto'>Update profile</h1>
            <h1 className='text-xs text-gray-400 mx-auto'>Let's complete your profile</h1>
            <progress className="progress w-[160px] mt-2 progress-primary" value="70" max="100"></progress>
            <button className='btn no-animation normal-case text-white btn-primary justify-between btn-sm mt-3'>Update now <MdOutlineNavigateNext className='rounded-full bg-gray-500 bg-opacity-60 w-5 h-5 text-white' /></button>
        </div>
    </div>
  )
}

export default UpdateProfile