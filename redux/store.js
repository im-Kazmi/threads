import { combineReducers, configureStore } from '@reduxjs/toolkit'
import postSlice from './slices/postSlice'

const rootReducer = combineReducers({
    posts:postSlice
})
export const store = configureStore({
  reducer: rootReducer,
  devTools:true
  
})