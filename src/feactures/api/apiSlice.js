import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const apiSlice = createApi({
    resucerPath : 'api',
    baseQuery : fetchBaseQuery({baseUrl:'http:localhost:3500'}),
    tagTypes : ['Post'],
    endpoints : builder => ({})
})  