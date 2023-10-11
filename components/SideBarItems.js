import React from "react";
import { FcFeedIn } from "react-icons/fc";
import { IoMdPeople, IoMdVideocam, IoMdPhotos } from "react-icons/io";
import { BiGroup,BiEnvelopeOpen } from "react-icons/bi";
import { RiSettingsLine } from "react-icons/ri";
import SideBarItem from "./SideBarItem";
import { TbFriends } from "react-icons/tb";
import { useAuthContext } from "@/context/AuthContext";

const items = [
  { id: 1, name: "Feed", link: "/", Icon: <FcFeedIn /> },
  { id: 2, name: "Friends", link: "/", Icon: <TbFriends /> },
  { id: 7, name: "People", link: "/people", Icon: <IoMdPeople /> },
  { id: 3, name: "Groups", link: "/", Icon: <BiGroup /> },
  { id: 4, name: "Events", link: "/", Icon: <BiEnvelopeOpen /> },
  { id: 5, name: "Videos", link: "/", Icon: <IoMdVideocam /> },
  { id: 6, name: "Photos", link: "/", Icon: <IoMdPhotos /> },
];

const SideBarItems = () => {

  const {user} = useAuthContext()
  return (
    <div className="flex h-[100%] flex-col w-full">
      <div className=" w-[200px] mt-5 cursor-pointer flex ml-2 bg-primary bg-opacity-20 px-4 py-2 rounded-lg">
        <div className="flex  my-auto ml-2">
        <img src={user?.avatar} className=" w-8 h-8 rounded-full" />
          <h1 className="text-sm my-auto ml-2">{user?.firstname + " " + user?.lastname}</h1>
          {/* <img src={'/user.png'} className=" w-8 h-8 rounded-full" /> */}
          {/* <h1 className="text-sm my-auto ml-2">Abid kazmi</h1> */}
        </div>
      </div>
      <div className="flex flex-col mt-5">
        {items.map((item) => (
          <SideBarItem item={item} key={item.id} />
        ))}
      </div>
      <div className="w-[200px]  m-auto hover:bg-primary flex ml-2 px-3 py-3  cursor-pointer bg-opacity-50 rounded-lg">
        <span className="my-auto">
          <RiSettingsLine />
        </span>
        <div className="ml-2">
          <h1>Settings</h1>
        </div>
      </div>
    </div>
  );
};

export default SideBarItems;
