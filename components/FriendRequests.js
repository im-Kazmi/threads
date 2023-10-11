import { useAuthContext } from '@/context/AuthContext'
import { fakeUsers } from '@/fakedata/data'
import axios from 'axios'
import React, { useState } from 'react'

const FriendRequests = () => {
    const {user} = useAuthContext()
    const [name,setName] = useState({
        name:"",
        email:"",
        password:"",
        avatar:"",
        fatherName:"",
        motherName:"",
        role:"user"|| null
    })
    const handleAddFriend = async(senderId)=>{
        try {
            const {data} = await axios.post('/api/acceptrequest',{senderId})
            console.log('request accepted')
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className='bg-white flex-col mt-5 py-3 px-1 w-[90%] h-[240px] gap-2 rounded-xl mx-auto shadow-lg flex'>
    <div className='mx-auto  w-full flex flex-col'>
       <div className='flex m-auto justify-between w-full'>
            <h1 className='text-md m-auto font-bold text-gray-500'>Friend Requests</h1>
            <h1 className='text-xs m-auto text-primary cursor-pointer'>See all</h1>
       </div>
       <hr className=' my-1 mx-auto w-[85%]' />
    </div>
    <div className='flex flex-col mx-3 gap-2'>
    {
        user?.requestsRecieved?.map((user)=>(
            <div className='flex justify-between hover:bg-primary hover:bg-opacity-30 rounded-xl px-2 py-1 z-20 cursor-pointer'>
            <div className='flex gap-2 rounded-lg   px-3 py-1 cursor-pointer'>
                <img src={user.avatar} className='w-8 h-8 rounded-full' />
                <div className='flex flex-col'>
                    <h1 className='text-sm'>{user?.firstname + " " + user.lastname}</h1>
                    <p className='text-xs'>120 mutual friends</p>
                </div>
                </div>
                
                <button onClick={()=> handleAddFriend(user._id)}  className=' w-10 h-7 rounded-xl bg-black  cursor-pointer  text-white'>hi</button>
            </div>
        ))
    }
    </div>
</div>
  )
}

export default FriendRequests