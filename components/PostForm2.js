"use client";
import React, { useRef, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import Images from "./Images";
import axios from "axios";
import Modal from "./Modal";
import { TbPhotoPlus } from "react-icons/tb";
import { useAuthContext } from "@/context/AuthContext";
import toast,{Toaster} from "react-hot-toast";
import { useTweetContext } from "@/context/TweetContext";

const PostForm2 = () => {
  const textAreaRef = useRef(null);
  const fileRef = useRef(null);
  const modalOpenButtonRef = useRef(null)
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const {user} = useAuthContext()
  const {setTweets} = useTweetContext()

  
  const handleFilesChange = (e) => {
    const selectedFiles = e.target.files;
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
        };
      }
    }
  };


  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/tweet/new", {
        text,
        images:files.map((file)=> file.url)
      });
      if (res.status === 200) {
        setTweets(res.data?.tweets)
        setLoading(false);
        toast.success("post addedd success");
      }
    } catch (error) {
      toast.error("error creating tweet");
      setLoading(false)
    }
  };
  return (
    <div   className="z-50 flex flex-col w-full px-5 py-5 mb-3 bg-white rounded-lg "  >
      <Toaster />
      <Modal id='formModal'>
      <form onSubmit={formSubmit} >
        <div className="flex flex-col mt-3"  >
          <h1 className="">Create Post</h1>
          <hr className="my-2" />
          <div className="flex mt-5">
            <img src={user?.avatar} className="w-8 h-8 rounded-full" />
            <h1 className="my-auto ml-3 text-sm font-bold">
              {user?.firstname + " "+  user?.lastname}
            </h1>
          </div>
          <div className="mt-7 ">
            <textarea
              value={text}
              ref={textAreaRef}
              placeholder="What's in your mind"
              className="w-full outline-none min-h-[100px]  bg-transparent border rounded-lg py-2 px-2"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <Images files={files} setFiles={setFiles} />
        </div>
        <input onChange={handleFilesChange} accept="images/*" multiple ref={fileRef} type="file" className="hidden" />
        <div className="flex justify-center w-full mt-5">
          <div className=" h-[60px] flex justify-between rounded-md px-3 border-2 w-full">
            <h1 className="my-auto text-sm font-bold text-gray-500"> Add to your post </h1>
            <div className="flex gap-1 my-auto">
              <span onClick={() => fileRef.current?.click()} className="p-1 text-2xl rounded-full cursor-pointer hover:bg-base-300" >
                <FcAddImage />
              </span>
            </div>
          </div>
        </div>
        <button type="submit" className="w-full mt-2 text-white btn btn-sm btn-primary no-animation" >
          {!loading ? "Post" : (<span className=" loading loading-spinner text-secondary"></span>) }
        </button>
      </form>
      </Modal>
            <div className="flex w-full gap-2">
        <img
          src={user?.avatar}
          className="w-10 h-10 border-2 rounded-full border-base-200"
        />
        <input
          type="text"
          onClick={()=> modalOpenButtonRef.current?.click()}
          className="w-full px-3 py-2 normal-case rounded-md outline-none cursor-text bg-primary bg-opacity-10"
          placeholder={`what's in your mind! ${user?.lastname}`}
        />
        <label htmlFor="formModal" className="hidden btn" ref={modalOpenButtonRef}>open</label>
      </div>
      <div className="flex justify-between mt-3">
        <span className="flex gap-2 my-auto text-gray-500 normal-case bg-transparent border-none btn hover:bg-primary hover:bg-opacity-5">
          <TbPhotoPlus className="text-lg text-primary" />
          Photo/video
        </span>
        <button className="mt-2 text-white btn btn-sm btn-primary no-animation">
          Post
        </button>
      </div>
    </div>
  );
};

export default PostForm2;
