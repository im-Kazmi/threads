"use client";
import React, { useRef, useState } from "react";
import { Roboto } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';


const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const page = () => {
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    avatar: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    if (e.target.name == "file") {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        setAvatarPreview(fileReader.result);
        console.log(avatarPreview)
      };
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFormSubmit = async  (e) => {
    e.preventDefault()
    try {
      setLoading(true);
        if(data.confirmPassword !== data.password){
            toast.error('passwords not matched')
            setLoading(false)
            return

        }
      const res = await axios.post("/api/auth/signup", {
        ...data,
        avatar: avatarPreview,
      });
      console.log(res)

      if (res.status === 200) {
        setLoading(false);
        toast.success('signup success')
      }else{
        toast.error(res?.data?.error?.message)
      }

    } catch (error) {
        toast.error(error?.res?.error?.message)
      
    }
  };
  return (
    <div className={`w-full h-screen flex ${roboto.className} `}>
      <Toaster />
      {/* <Modal id='confirmationModal'>
        <h1 className="text-xl">Verification email has been send to your email</h1>
        <button onClick={router.push('/')} className="btn mx-auto">I will confirm it</button>
      </Modal> */}
      <div className="w-1/2 max-sm:w-2/2 h-full flex flex-col justify-center">       
        <form onSubmit={handleFormSubmit}  className="m-auto flex flex-col w-full gap-3 px-10">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <input
            onChange={handleInputChange}
            name="file"
            value={data.avatar}
            type="file"
            ref={fileRef}
            className="px-1 py-2 hidden outline-none border-b m-auto w-full"
          />
          <img
            src={`${avatarPreview ? avatarPreview : "/user.png"} `}
            onClick={() => fileRef.current?.click()}
            className="w-16 cursor-pointer h-16 rounded-full"
          />
          <input
            onChange={handleInputChange}
            name="firstname"
            type="text"
            value={data.firstname}
            placeholder="Firstname"
            className="px-1 py-2 outline-none border-b border-black m-auto w-full"
          />
          <input
            onChange={handleInputChange}
            name="lastname"
            value={data.lastname}
            type="text"
            placeholder="Lastname"
            className="px-1 py-2 outline-none border-b border-black m-auto w-full"
          />
          <input
            onChange={handleInputChange}
            name="email"
            value={data.email}
            type="email"
            placeholder="Email"
            className="px-1 py-2 outline-none border-b border-black m-auto w-full"
          />
          <input
            onChange={handleInputChange}
            name="password"
            value={data.password}
            type="password"
            placeholder="Password"
            className="px-1 py-2 outline-none border-b border-black m-auto w-full"

          />
          <input
            onChange={handleInputChange}
            name="confirmPassword"
            type="password"
            value={data.confirmPassword}
            placeholder="Confirm password"
            className="px-1 py-2 outline-none border-b border-black m-auto w-full"
          />
          <button
            type="submit"
            className="btn bg-black no-animation text-white w-full"
          >
            {loading ? <span className="loading loading-spinner text-primary"></span>:'Continue'}
          </button>
        </form>
      <span>Already have an Account <Link className="text-primary hover:border-b-primary mr-3" href={'/auth/login'}>Login</Link></span>
          <button className="btn w-full">
            <FcGoogle className="text-2xl" />
            Continue with google
          </button>
      </div>

      <div className="w-1/2 h-full max-sm:hidden rounded-2xl ">
        <img
          className="w-full h-full mr-20 pr-5 py-5 rounded-br-[100px] rounded-tl-[100px]"
          src="/car.png"
        />
      </div>
    </div>
  );
};

export default page;
