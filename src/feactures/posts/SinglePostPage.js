import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from './postSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButton from './ReactionButton'
import { Link, useParams } from 'react-router-dom'

const SinglePostPage = () => {
  const { postId } = useParams()
  const post = useSelector((state) => selectPostById(state, Number(postId)))

  if (!post) {
    return (
      <section className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h2 className="mb-0">Post not found!</h2>
        </div>
      </section>
    )
  }

  return (
    <section className="container mt-5">
      <article className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-text">{post.body}</p>

          <div className="mb-3">
            <Link to={`/post/edit/${post.id}`} className="btn btn-outline-secondary btn-sm">
              Edit Post
            </Link>
          </div>

          <div className="text-muted small mb-2">
            <PostAuthor userId={post.userId} /> | <TimeAgo timestamp={post.date} />
          </div>

          <div>
            <ReactionButton post={post} />
          </div>
        </div>
      </article>
    </section>
  )
}

export default SinglePostPage
