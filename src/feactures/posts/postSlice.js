import { createEntityAdapter, createSelector} from "@reduxjs/toolkit";
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
      // transformResponse : responseData =>{
      //   let min = 1;
      //   const loadedPosts = responseData.map(post=>{
      //     if(!post?.date) post.date = sub(new Date(),{minutes : min++}).toISOString()
      //     if(!post?.reactions) post.reactions = {
      //       thumbsUp : 0,
      //       wow :0,
      //       heart :0,
      //       rocket :0 ,
      //       coffee : 0
      //     }
      //     return post 
      //   })
      //   return postsAdapter.setAll(initialState,loadedPosts)
      // },
      // providesTags : (result , error ,arg) =>[
      //   {type : 'Post' , id : 'LIST'},
      //   ...result.ids.map(id => ({type : 'Post',id }))
      // ]
    transformResponse : responseData => {
  let min = 1;
  const loadedPosts = responseData.map(post => {
    if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString()
    if (!post?.reactions) post.reactions = {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    }
    return post;
  })
  return postsAdapter.setAll(initialState, loadedPosts)
},


providesTags: (result, error, arg) =>
  result
    ? result.ids.map(id => ({ type: 'Post', id }))
    : []

    }),
    getPostByUserId : builder.query({
      query : id=>`/posts/?userId=${id}`,
      transformErrorResponse : responseData=>{
        let min = 1;
        const loadedPosts = responseData.map(post=>{
          if(!post?.date) post.date = sub(new Date(),{minutes :min++}).toISOString()
          if(!post?.reactions) post.reactions = {
            thumbsUp : 0,
            wow : 0,
            heart :0,
            rocket :0,
            coffee : 0
          }
          return post
        })
        return postsAdapter.setAll(initialState,loadedPosts)
      },
      // providesTags : (result,error,arg)=>{
      //   console.log(result)
      //   return [
      //     ...result.ids.map(id =>({type:'Post',id }))
      //   ]
      // }
     providesTags: (result, error, arg) =>
  result
    ? [
        { type: 'Post', id: 'LIST' },
        ...result.ids.map(id => ({ type: 'Post', id }))
      ]
    : [{ type: 'Post', id: 'LIST' }]

    }),
    addNewPost : builder.mutation({
      query : initialPost =>({
        url : '/posts',
        method : 'POST',
        body : {
          ...initialPost,
          userId:Number(initialPost.userId),
          date : new Date().toISOString(),
          reactions : {
            thumbsUp : 0,
            wow : 0,
            heart :0,
            rocket :0,
            coffee : 0
          }
        }
      }),   
      invalidatesTags:[
        {type : 'Post', id : 'LIST'}
      ]
    }),
    updatePost : builder.mutation({
      query : initialPost=>({
        url : `/posts/${initialPost.id}`,
        method : 'PUT',
        body : {
          ...initialPost,
          date : new Date().toISOString()
        }
      }),
      invalidatesTags : (result,error,arg) =>[
        {type : 'Post',id : arg.id}
      ]
    }),
  deletePost : builder.mutation({
  query : ({id}) =>({
    url : `/posts/${id}`,  
    method : 'DELETE',
    body : {id}
  }),
  invalidatesTags : (result,error,arg)=>[
    {type : 'Post',id : arg.id}
  ]
}),


    addReaction : builder.mutation({
      query : ({postId,reactions}) =>({
        url :`posts/${postId}`,
        method : 'PATCH',
        body : {reactions}
      }),
      async onQueryStarted({postId,reactions},{dispatch,queryFulfilled}){
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData('getPosts',undefined,draft=>{
            const post = draft.entities[postId]
              if(post) post.reactions = reactions
          })
        )
        try{
          await queryFulfilled
        }catch{
          patchResult.undo()
        }
      }
    })
  })
})

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddReactionMutation
} = extendedApiSlice;

// Inside postSlice.js
console.log("✅ Hook test:", typeof useGetPostsQuery); // should log: 'function'


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

