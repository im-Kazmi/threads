import { fakeStories } from "@/fakedata/data";
import React, { useRef, useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import Modal from "./Modal";
import { BiImage } from "react-icons/bi";
import {PiTextAaLight} from 'react-icons/pi'

const Stories = () => {
    const fileRef = useRef()

    const handleFileChange =()=>{
      console.log('onchage')
    }
  return (
    <div className="w-full flex gap-2 mb-5">
        <Modal id="storyOptionsModal" width="800px">
        <div className="flex gap-10 w-full mt-5 justify-center">
          <div onClick={() =>fileRef?.current?.click()}  className="flex w-[200px] hover:animate-pulse cursor-pointer h-[300px] rounded-lg bg-gradient-to-b from-pink-400 to-blue-400 ">
            <input ref={fileRef} onChange={handleFileChange} accept="image/*" type="file" className="hidden" />
            <div className="m-auto">
              <span className="bg-white m-auto w-5 h-5 rounded-full">
                <BiImage className="m-auto text-white text-3xl" />
              </span>
              <h1 className="text-sm font-bold text-white">Create a photo story</h1>
            </div>
          </div>
          <div  className="flex w-[200px] hover:animate-pulse  cursor-pointer h-[300px] rounded-lg bg-gradient-to-b from-yellow-400 to-orange-400">
            <div className="m-auto">
              <span className="bg-white m-auto w-5 h-5 rounded-full">
                <PiTextAaLight className="m-auto text-white text-3xl" />
              </span>
              <h1 className="text-sm font-bold text-white">Create a text story</h1>
            </div>
          </div>
        </div>
      </Modal>

      <div
        onClick={()=> window?.storyOptionsModal?.showModal()}
        className="w-[95px] h-[140px] flex cursor-pointer bg-white rounded-lg shadow-lg"
      >
        <div className="m-auto">
          <BsPlusSquare className="text-primary m-auto" />
          <h1 className="text-xs mt-2 font-bold text-gray-500 m-auto">
            Create story
          </h1>
        </div>
      </div>
      {fakeStories.map((story) => (
        <div id={story.id} className="w-[95px] h-[140px]  relative cursor-pointer hover:scale-105 hover:animate-pulse bg-white rounded-lg shadow-lg">
          <img
            src={story.image}
            className="w-full relative object-cover rounded-lg h-full"
          />
          <div className=" absolute inset-x-0 bottom-3 flex flex-col justify-center item-center">
            <img
              src={story.author.profileImage}
              className="w-6 h-6 m-auto rounded-full border-2 border-primary"
            />
            <h1 className="text-[10px] text-white font-bold m-auto">
              {story.author.name}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stories;
