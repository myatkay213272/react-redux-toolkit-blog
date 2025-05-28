import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import {sub} from 'date-fns'

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

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState ={
  posts : [],
  status : 'idle',
  error : null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async()=>{
  try{
    const response = await axios.get(POSTS_URL)
    return [...response.data]
  }catch(err){
    return err.message
  }
})


const postSlice = createSlice({
    name : 'posts',
    initialState,
    reducers : {
        postAdded :{
          reducer(state,action){
            state.push(action.payload)
          },
          prepare(title,content,userId){
            return{
              payload :{
                id : nanoid(),
                title,
                content,
                date : new Date().toISOString(),
                userId,
                reactions : {
                  thumbsUp : 0,
                  wow : 0,
                  heart : 0,
                  rocket :0,
                  coffee:0
                }
              }
            }
          }
        },
        reactionAdded(state,action){
          const {postId,reaction} = action.payload
          const existingPost = state.posts.find(post=>post.id === postId)
          if(existingPost){
            existingPost.reactions[reaction]++
          }
        } 
    },
    extraReducers(builder){
      builder 
        .addCase(fetchPosts.pending,(state,action)=>{
          state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
          state.status = 'succeeded'

          //Adding date & reactions
          let min = 1
          const loadedPosts = action.payload.map(post=>{
            post.data = sub(new Date(),{minutes : min++}).toISOString()
            post.reactions = {
              thumbsUp : 0,
              wow : 0,
              heart : 0,
              rocket :0,
              coffee:0
            }
            return post
          })
          //Add any fetched posts to the array
          state.posts = state.posts.concat(loadedPosts)
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
          state.status = 'failed'
          state.error = action.error.message
        })
    }
})

export const selectAllPosts = (state)=>state.posts.posts;
export const getPostStatus = (state)=>state.posts.status;
export const getPostError = (state)=>state.posts.error;


export const {postAdded,reactionAdded} = postSlice.actions

export default postSlice.reducer