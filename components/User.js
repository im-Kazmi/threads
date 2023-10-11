import React from "react";

const User = ({user}) => {
  return (
    <div className="flex my-1 hover:bg-base-200 py-2 cursor-pointer">
      <img className="w-8 h-8  ml-2 rounded-full" src={user.image} />
      <h1 className="my-auto ml-2">{user.name}</h1>
    </div>
  );
};

export default User;
