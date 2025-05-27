import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: 'Learning Redux Toolkit',
    content: 'Redux Toolkit makes writing Redux code easier.'
  },
  {
    id: 2,
    title: 'React with Redux',
    content: 'React works well with Redux for managing state.'
  },
  {
    id: 3,
    title: 'Writing Better Code',
    content: 'Keep your code simple and clean.'
  }
];


const postSlice = createSlice({
    name : 'posts',
    initialState,
    reducers : {
        postAdded(state,action){
            state.push(action.payload)
        }
    }
})

export const selectAllPosts = (state)=>state.posts;

export const {postAdded} = postSlice.actions

export default postSlice.reducer