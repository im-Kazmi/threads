"use client";
import React, { useRef, useState } from "react";
import { Roboto } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
  };

  const handleFormSubmit = async function(e){
    e.preventDefault()
    try {
      setLoading(true)
        const res = await axios.post('/api/auth/login',{...data})
        console.log(res)
        if(res.status == 200){
          toast.success('Logged In successfully')
          router.push('/')
          setLoading(false)
        }
    } catch (error) {
      toast.error('LoggedIn failed')
      setLoading(false)
    }
  }
  return (
    <div className={`w-full h-screen flex ${roboto.className} `}>
      <Toaster />
        <div className="w-1/2 h-full max-sm:hidden rounded-2xl ">
        <img
          className="w-full h-full mr-20 pr-5 py-5 rounded-br-[100px] rounded-tl-[100px]"
          src="/car.png"
        />
      </div>
      <div className="flex justify-center w-1/2 h-full max-sm:w-2/2">
        <form onSubmit={handleFormSubmit} className="flex flex-col w-full gap-3 px-10 m-auto">
          <h1 className="text-3xl font-bold">SignIn</h1>
          <input
          onChange={handleInputChange}
            name="email"
            value={data.email}
            type="email"
            placeholder="Email"
            className="w-full px-1 py-2 m-auto border-b outline-none"
          />
          <input
          onChange={handleInputChange}
            name="password"
            value={data.password}
            type="password"
            placeholder="Password"
            className="w-full px-1 py-2 m-auto border-b outline-none"
          />
          <button type="submit" className="w-full text-white bg-black btn no-animation">
          {loading ? <span className="loading loading-spinner text-primary"></span>:'SignIn'}
            
          </button>
        <span>Dont have an Account yet! <Link className="mr-3 text-primary hover:border-b-primary" href={'/auth/signup'}>Signup</Link></span>
          <button className="w-full btn">
            <FcGoogle className="text-2xl" />
            Continue with google
          </button>
        </form>
      </div>

    </div>
  );
};

export default page;
