import React, { useState } from "react";
import { fakePost } from "@/fakedata/data";
import Comment from "./Comment";

const Comments = ({comments}) => {
  const [data,setData] = useState({
    name:"", 
    email:"",
    avatar:"",
    password:"",
    fName:""
  })

  const handleFormSubmit = async(Res)=>{
    const res = await axios.post('/api/users')
    if(res.status === 200){
      return res.data
    }
  }

const logout = async(req)=>{
  try {
    const res = await axios.post('/api/logout')
    if(res.ok){
      console.log('logout');
    }else{
      console.log('failed');
    }
  } catch (error) {
    
  }
}
  return (
    <div className="w-full flex flex-col gap-3">
    <div className="w-full ml-5 flex flex-col gap-3">
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
      <button className='bg-primary text-white flex btn btn-sm m-auto no-animation w-[90%] normal-case'>view all comments</button>
    </div>
  );
};

export default Comments;
