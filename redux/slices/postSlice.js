import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading:false,
    posts:[],
    error:''
}

export const fetchPosts = createAsyncThunk(
    '/api/posts',
    async () => {
      try {
        const response = await axios.get('/api/tweet')
        return response.data
      } catch (error) {
        console.log(error.message)
      }
    }
  )
  
const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(fetchPosts.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(fetchPosts.fulfilled ,(state,action)=>{
            state.loading = false,
            state.posts = action.payload
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.loading = false,
            state.posts = [],
            state.error = action.payload
        })
    }
})

export const {}  = postSlice.actions

export default postSlice.reducer