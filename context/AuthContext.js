'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { createContext, useContext } from 'react';

const AuthContext = createContext();

import React, { useEffect, useState } from "react";

const AuthContextProvider = ({ children }) => {
  const router = useRouter()
  const [logoutLoading,setLogoutLoading] = useState(false)

 const {data:user,isLoading:loading} =  useQuery({
  queryKey:['user'],
  queryFn:async()=>{
    const {data} = await axios.get('/api/auth/getuser')
    return data
  }
 }
 )
   
  const logout = async() =>{
    try {
      setLogoutLoading(true)
      const res = await axios.post('/api/auth/logout')
      router.push('/auth/login')
      setUser({})
      setLogoutLoading(false)
    } catch (error) {
      console.log(error)
      setLogoutLoading(false)
    }
  }

  const value = {
    user,
    loading,
    logout,
    logoutLoading
  }
  return (
  <AuthContext.Provider value={value}>
    {/* {loading ? 
    (<div className='flex w-full max-h-screen min-h-screen'>
    <div className='w-10 h-10 m-auto loading loading-spinner border-cyan-500'>

    </div> 
    </div> ) */}
    {children}
    </AuthContext.Provider>
    )
};

export const useAuthContext = ()=>{
  return useContext(AuthContext)
}
export default AuthContextProvider;
