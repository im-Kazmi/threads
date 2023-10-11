"use client";
import React from "react";

const Sidebar = ({bg,children}) => {
  return (
    <div className={` bg-${bg} bg-opacity-80 w-full flex min-h-screen flex-col`}>
      {children}
    </div>
  );
};

export default Sidebar;
