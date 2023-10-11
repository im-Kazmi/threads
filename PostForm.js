"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { CiVideoOn } from "react-icons/ci";
import { TbPhotoPlus } from "react-icons/tb";
import Modal from "./components/Modal";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiAngry, BsEmojiFrown } from "react-icons/bs";
import { useAppContext } from "@/contexts/appContext";
import { FcAddImage } from "react-icons/fc";
import { FaTags, FaGift } from "react-icons/fa";
import { BiImageAdd, BiSolidLocationPlus } from "react-icons/bi";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import Images from "./components/Images";
import handleClickOutside from "@/utils/handleClickOutside";
import { uploadPost } from "@/actions/posts";
import toast, { Toaster } from 'react-hot-toast';

import axios from "axios";

const PostForm = () => {
  const pickerRef = useRef(null);
  const textAreaRef = useRef(null);
  const fileRef = useRef(null);
  const fileInputRef = useRef(null);
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [fileInputOpen, setFileInputOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading,setLoading] = useState(false)

  const handleEmojiSelect = (emoji) => {
    textAreaRef?.current.focus();
    setText((prevText) => prevText + emoji.native);
  };

  const handleFilesChange = (e) => {
    const selectedFiles = e.target.files;
    console.log(selectedFiles);
    if (selectedFiles) {
      const updatedFilesArray = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const reader = new FileReader();

        reader.readAsDataURL(selectedFiles[i]);

        reader.onload = () => {
          updatedFilesArray.push({
            name: selectedFiles[i].name,
            url: reader.result,
            type: selectedFiles[i].type,
          });

          setFiles(updatedFilesArray);
          setFileInputOpen(false);
        };
      }
    }
  };
  const images = files.filter((f) => f?.type.includes("image"));
  const videos = files.filter((f) => f?.type.includes("video"));

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post('/api/tweet',{
        author: session?.user.id,
        content: [
          { type: "text", value: text },
        ],
      })
      setLoading(false)
      if(res.status === 200){
          toast.success('post addedd success')
      }
  } catch (error) {
      toast.error(error?.response?.data?.message)
  }
  };
  return (
    <form
    onSubmit={formSubmit}
      onClick={(e) => handleClickOutside(pickerRef, setShowEmojiPicker, e)}
      className=" w-full bg-white rounded-lg flex flex-col py-5 mb-3  px-5"
    >
      <Toaster />
      {/* <Modal onSubmit={formSubmit} id={"addTweetModal"}> */}
        <div>
          <div className="flex mt-3 flex-col" onClick={(e) => handleClickOutside(fileInputRef, setFileInputOpen, e)}>
          <h1 className="">Create Post</h1>
          <hr />
          <div className="flex mt-5">
            <img src={session?.user.id} className="w-8 h-8 rounded-full" />
            <h1 className="ml-3 text-sm font-bold my-auto">
              {session?.user.name}
            </h1>
          </div>
          <div  className="mt-7 min-h-[100px] max-h-[250px] ">
            <textarea
              value={text}
              ref={textAreaRef}
              placeholder="What's in your mind"
              className="w-full outline-none overflow-y-scroll"
              onChange={(e) => setText(e.target.value)}
            />
            {showEmojiPicker && (
              <div ref={pickerRef} className="flex justify-center w-full">
                <Picker
                  style={{
                    position: "absolute",
                    bottom: "0px",
                    right: "0px",
                    left: "0px",
                    top: "0px",
                  }}
                  onEmojiSelect={handleEmojiSelect}
                  title="Pick an emoji"
                  emoji="point_up"
                  data={data}
                />
              </div>
            )}
          </div >
          <div>
            <Images files={files} />
          </div>
        </div>
        {fileInputOpen && (
          <div ref={fileInputRef} className="w-full flex mb-2 ">
            <input
              onChange={handleFilesChange}
              multiple
              ref={fileRef}
              type="file"
              className="hidden"
            />
            <div
              onClick={() => fileRef?.current?.click()}
              className="w-full hover:bg-gray-300 cursor-pointer py-2 flex flex-col  border bg-base-300 h-[100px] "
            >
              <span className="btn m-auto btn-circle no-animation">
                <MdPhotoSizeSelectActual />{" "}
              </span>
              <h1 className="text-sm mx-auto mt-o text-gray-500">
                Select images/videos
              </h1>
            </div>
          </div>
        )}

        <div className="flex justify-between w-full px-3">
          <img src="/palette.png" className="w-5 h-5" />
          <span
            className="cursor-pointer"
            onClick={() => {
              setShowEmojiPicker(true), setFileInputOpen(false);
            }}
          >
            <BsEmojiAngry />
          </span>
        </div>
        <div className="w-full mt-5 flex justify-center">
          <div className=" h-[60px] flex justify-between rounded-md px-3 border-2 w-full">
            <h1 className="text-sm my-auto font-bold text-gray-500">
              Add to your post
            </h1>
            <div className="flex gap-1 my-auto">
              <span
                onClick={() => setFileInputOpen(true)}
                className="text-2xl cursor-pointer hover:bg-base-300 p-1 rounded-full"
              >
                <FcAddImage />
              </span>
              <span className="text-2xl cursor-pointer hover:bg-base-300 p-1 rounded-full text-cyan-600">
                <FaTags />
              </span>
              <span className="text-2xl cursor-pointer hover:bg-base-300 p-1 rounded-full text-green-500">
                <FaGift />
              </span>
              <span className="text-2xl cursor-pointer hover:bg-base-300 p-1 rounded-full text-red-500">
                <BiSolidLocationPlus />
              </span>
              <span className="text-2xl cursor-pointer hover:bg-base-300 p-1 rounded-full text-yellow-400">
                <BsEmojiFrown />
              </span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="btn w-full mt-2 btn-sm btn-primary no-animation text-white"
          >
            {loading ? <span className=" loading loading-spinner text-primary"></span>:"Post"}
            </button>
        </div>
        </div>
      {/* </Modal> */}
      {/* <div className="flex w-full gap-2">
        <img
          src={session?.user.image}
          className="w-10 h-10 rounded-full border-2 border-base-200"
        />
        <input
          type="text"
          onClick={() => window?.addTweetModal?.showModal()}
          className="w-full normal-case cursor-text px-3 py-2 bg-base-200 rounded-md outline-none"
          placeholder={`what's in your mind! ${session?.user?.lastname}`}
        />
      </div>
      <div className="mt-3  flex justify-between">
        <span className="flex gap-2 btn bg-transparent hover:bg-primary border-none normal-case text-gray-500 hover:bg-opacity-5 my-auto">
          <TbPhotoPlus className="text-primary text-lg" />
          Photo/video
        </span>
        <button className="btn mt-2 btn-sm btn-primary no-animation text-white">
          Post
        </button>
      </div> */}
    </form>
  );
};

export default PostForm;
