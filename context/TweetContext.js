"use client";
import { Query, QueryCache, QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext } from "react";
import React, { useEffect, useState } from "react";

const TweetContext = createContext();

const TweetContextProvider = ({ children }) => {

  const {data:tweets,isLoading} =  useQuery({
    queryKey:['tweets'],
    queryFn:async()=>{
      const {data} = await axios.get('/api/tweet')
      return data
    }
   }
   )
  const handleTweetLikeAndUnlike = async (id,type) => {
    try {
      if(type == 'like'){
        useMutation({
          mutationKey:['tweet'],
          mutationFn:(like)=>{
           return axios.post(`/api/tweet/${id}/like`,like)
          },
          onSuccess:(data,values)=>{
            console.log('success')
          }
        })
      }else if(type=='unlike'){
        const {data} = await axios.post(`/api/tweet/${id}/unlike`)
        useMutation({})
      }
    } catch (error) {
      console.log(error)
    }
  };


  const value = {
    tweets,
    handleTweetLikeAndUnlike,
    
  };
  return (
    <TweetContext.Provider value={value}>{children}</TweetContext.Provider>
  );
};

export const useTweetContext = () => {
  return useContext(TweetContext);
};
export default TweetContextProvider;
