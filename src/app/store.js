import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../feactures/posts/postSlice'
import userReducer from '../feactures/users/userSlice'

export const store = configureStore({
    reducer :{
        posts : postsReducer,
        users :userReducer
    }
})