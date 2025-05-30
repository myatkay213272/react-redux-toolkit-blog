import { createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
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

const postsAdapter = createEntityAdapter({
  sortComparer : (a,b)=>b.date.localeCompare(a.date)
})

const initialState =postsAdapter.getInitialState({
  posts : [],
  status : 'idle',
  error : null,
  count : 0
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async()=>{
  try{
    const response = await axios.get(POSTS_URL)
    return response.data
  }catch(err){
    return err.message
  }
})


export const addNewPost = createAsyncThunk('posts/addNewPost',async (initialPost)=>{
  try{
    const response = await axios.post(POSTS_URL,initialPost)
    return response.data
  }catch(err){
    return err.message
  }
})

export const updatePost = createAsyncThunk('posts/updatePost',async(initialPost)=>{
  const {id} = initialPost
  try{
    const response = await axios.put(`${POSTS_URL}/${id}`,initialPost)
    return response.data
  }catch(err){
    return initialPost  //only for testing Redux!!
  }
})


export const deletePost = createAsyncThunk('posts/deletePost',async(initialPost)=>{
  const {id} = initialPost
  try{
    const response = await axios.delete(`${POSTS_URL}/${id}`)
    if(response?.status === 200) return initialPost
    return `${response?.status}:${response?.statusText}`
  }catch(err){
    return err.message
  }
})

const postSlice = createSlice({
    name : 'posts',
    initialState,
    reducers : {
        reactionAdded(state,action){
          const {postId,reaction} = action.payload
          const existingPost = state.entities[postId]
          if(existingPost){
            existingPost.reactions[reaction]++
          }
        },
        increaseCount(state,action){
          state.count = state.count + 1
        } 
    },
    extraReducers(builder){
      builder 
        .addCase(fetchPosts.pending,(state,action)=>{
          state.status = 'loading'

        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
          state.status = 'succeeded'

          const existingIds = new Set(state.posts.map(post=>post.id))

          //Adding date & reactions
          let min = 1
          const loadedPosts = action.payload
          .filter(post => !existingIds.has(post.id))
          .map(post=>{
            post.date = sub(new Date(),{minutes : min++}).toISOString()
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
          postsAdapter.upsertMany(state,loadedPosts)
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
          state.status = 'failed'
          state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled,(state,action)=>{
          action.payload.userId = Number(action.payload.userId)
          action.payload.date = new Date().toISOString()
          action.payload.reactions = {
            thumbsUp : 0,
            wow : 0,
            heart : 0,
            rocket :0,
            eye:0
          }
          console.log(action.payload)
          postsAdapter.addOne(state,action.payload)
        })
        .addCase(updatePost.fulfilled,(state,action)=>{
          if(!action.payload?.id){
            console.log('Update could not complete')
            console.log(action.payload)
            return 
          }
          action.payload.date = new Date().toISOString()
          postsAdapter.upsertOne(state,action.payload)
        })
        .addCase(deletePost.fulfilled,(state,action)=>{
          if(!action.payload?.id){
            console.log('Delete could not complete')
            console.log(action.payload)
            return
          }
            const {id} = action.payload
            postsAdapter.removeOne(state,id)
        })
       
    }
})

export const {
  selectAll : selectAllPosts,
  selectById : selectPostById,
  selectIds : selectPostIds
} = postsAdapter.getSelectors(state=>state.posts)

export const getPostStatus = (state)=>state.posts.status;
export const getPostError = (state)=>state.posts.error;
export const getCount = (state)=>state.posts.count;


export const selectPostByUser = createSelector(
  [selectAllPosts,(state,userId)=>userId],
  (posts,userId)=>posts.filter(post=>post.userId === userId)
)

export const {increaseCount,reactionAdded} = postSlice.actions

export default postSlice.reducer