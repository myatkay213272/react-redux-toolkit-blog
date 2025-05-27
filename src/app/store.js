import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../feactures/posts/postSlice'

export const store = configureStore({
    reducer :{
        posts : postsReducer
    }
})