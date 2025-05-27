import { createSlice, nanoid } from "@reduxjs/toolkit";
import {sub} from 'date-fns'

const initialState = [
  {
    id: 1,
    title: 'Learning Redux Toolkit',
    content: 'Redux Toolkit makes writing Redux code easier.',
    date : sub(new Date(),{minutes : 10}).toISOString()
  },
  {
    id: 2,
    title: 'React with Redux',
    content: 'React works well with Redux for managing state.',
    date : sub(new Date(),{minutes : 5}).toISOString()
  },
  {
    id: 3,
    title: 'Writing Better Code',
    content: 'Keep your code simple and clean.',
    date : sub(new Date(),{minutes : 15}).toISOString()

  }
];


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
                userId
              }
            }
          }
        }
    }
})

export const selectAllPosts = (state)=>state.posts;

export const {postAdded} = postSlice.actions

export default postSlice.reducer