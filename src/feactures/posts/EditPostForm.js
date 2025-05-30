import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import {  selectPostById, useDeletePostMutation, useUpdatePostMutation } from './postSlice'
import { selectAllUsers } from '../users/userSlice'

const EditPostForm = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const [updatePost,{isLoading}] = useUpdatePostMutation()
  const [deletePost] = useDeletePostMutation()

  const post = useSelector((state) => selectPostById(state, Number(postId)))
  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.body || '')
  const [userId, setUserId] = useState(post?.userId || '')

  if (!post) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Post not found</h4>
          <p>The post you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onAuthorChange = (e) => setUserId(e.target.value)

  const canSave = [title, content, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        await updatePost({ id: post.id,title ,body: content,userId}).unwrap()
        
        setTitle('')
        setContent('')
        setUserId('')
        navigate(`/post/${postId}`)
      } catch (err) {
        console.error('Failed to save the post:', err)
      }
    }
  }

  const onDeletePostClick = async () => {
    try {
      await deletePost({ id: post.id }).unwrap()

      setTitle('')
      setContent('')
      setUserId('')
      navigate('/')
    } catch (err) {
      console.error('Failed to delete the post:', err)
    }
  }

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">Edit Post</h2>
          <form onSubmit={onSavePostClicked}>
            <div className="mb-3">
              <label htmlFor="postTitle" className="form-label">Post Title</label>
              <input
                type="text"
                id="postTitle"
                className="form-control"
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
                id="postContent"
                className="form-control"
                rows="5"
                value={content}
                onChange={onContentChange}
                placeholder="Enter post content"
              ></textarea>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={!canSave}>
                Save Changes
              </button>
              <button type="button" className="btn btn-danger" onClick={onDeletePostClick}>
                Delete Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditPostForm
