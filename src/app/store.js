import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../feactures/api/apiSlice";
import userReducer from '../feactures/users/userSlice'

export const store = configureStore({
    reducer :{
        [apiSlice.reducerPath]:apiSlice.reducer,
        users :userReducer
    },
    middleware : getDefaultMiddleware=>
        getDefaultMiddleware().concat(apiSlice.middleware)
})