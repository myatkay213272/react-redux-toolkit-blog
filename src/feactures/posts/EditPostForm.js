import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { selectPostById, updatePost } from './postSlice'
import { selectAllUsers } from '../users/userSlice'

const EditPostForm = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const post = useSelector((state) => selectPostById(state, Number(postId)))
  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.body || '')
  const [userId, setUserId] = useState(post?.userId || '')
  const [requestStatus, setRequestStatus] = useState('idle')

  if (!post) {
    return (
      <section className="container mt-4">
        <h2 className="text-danger">Post not found</h2>
      </section>
    )
  }

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onAuthorChange = (e) => setUserId(e.target.value)

  const canSave = [title,content,userId].every(Boolean) && requestStatus === 'idle'

  const onSavePostClicked = (e)=>{
    e.preventDefault()
    if(canSave){
        try{
            setRequestStatus('pending')
            dispatch(updatePost(
              {
                id : post.id,
                title ,
                body : content,
                userId,
                reactions : post.reactions
              }
            )).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
            navigate(`/post/${postId}`)
        }catch(err){
          console.error('Failed to save the post',err)
        }finally{
          setRequestStatus('idle')
        }
    }
  }
  

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Post</h2>
      <form onSubmit={onSavePostClicked}>
        <div className="mb-3">
          <label htmlFor="postTitle" className="form-label">Post Title</label>
          <input
            type="text"
            className="form-control"
            id="postTitle"
            value={title}
            onChange={onTitleChange}
            placeholder="Enter post title"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="postAuthor" className="form-label">Author</label>
          <select
            id="postAuthor"
            className="form-select"
            value={userId}
            onChange={onAuthorChange}
          >
            <option value="">Select Author</option>
            {userOptions}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="postContent" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="postContent"
            rows="5"
            value={content}
            onChange={onContentChange}
            placeholder="Enter post content"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary" disabled={!canSave}>
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditPostForm
