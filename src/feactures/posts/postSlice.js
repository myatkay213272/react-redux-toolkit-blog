import { createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {sub} from 'date-fns'
import { apiSlice } from "../api/apiSlice";

// const initialState = [
//   {
//     id: 1,
//     title: 'Learning Redux Toolkit',
//     content: 'Redux Toolkit makes writing Redux code easier.',
//     date : sub(new Date(),{minutes : 10}).toISOString(),
//     reactions : {
//       thumbsUp : 0,
//       wow : 0,
//       heart : 0,
//       rocket :0,
//       coffee:0
//     }
//   },
//   {
//     id: 2,
//     title: 'React with Redux',
//     content: 'React works well with Redux for managing state.',
//     date : sub(new Date(),{minutes : 5}).toISOString(),
//     reactions : {
//       thumbsUp : 0,
//       wow : 0,
//       heart : 0,
//       rocket :0,
//       coffee:0
//     }
//   },
//   {
//     id: 3,
//     title: 'Writing Better Code',
//     content: 'Keep your code simple and clean.',
//     date : sub(new Date(),{minutes : 15}).toISOString(),
//     reactions : {
//       thumbsUp : 0,
//       wow : 0,
//       heart : 0,
//       rocket :0,
//       coffee:0
//     }

//   }
// ];


const postsAdapter = createEntityAdapter({
  sortComparer : (a,b)=>b.date.localeCompare(a.date)
})

const initialState =postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints : builder =>({
    getPosts :builder.query({
      query : ()=> '/posts',
      transformResponse : responseData =>{
        let min = 1;
        const loadedPosts = responseData.map(post=>{
          if(!post?.date) post.date = sub(new Date(),{minutes : min++}).toISOString()
          if(!post?.reactions) post.reactions = {
            thumbsUp : 0,
            wow :0,
            heart :0,
            rocket :0 ,
            coffee : 0
          }
          return post 
        })
        return postsAdapter.setAll(initialState,loadedPosts)
      },
      providesTags : (result , error ,arg) =>[
        {type : 'Post' , id : 'LIST'},
        ...result.ids.map(id => ({type : 'Post',id }))
      ]
    })
  })
})

export const {
  useGetPostsQuery
}= extendedApiSlice

//return query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

//Ceeates memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  postsResult => postsResult.data
)

export const {
  selectAll : selectAllPosts,
  selectById : selectPostById,
  selectIds : selectPostIds
} = postsAdapter.getSelectors(state=>selectPostsData(state) ?? initialState)

