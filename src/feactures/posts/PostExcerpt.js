import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButton from './ReactionButton'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPostById } from './postSlice'

const PostExcerpt = ({ postId }) => {
  const post = useSelector(state=>selectPostById(state,postId))

  return (
    <article className="card mb-4 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="card-text">
          {post.body.substring(0, 40)}...
        </p>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <Link to={`post/${post.id}`} className="btn btn-sm btn-primary">
            View Post
          </Link>
          <small className="text-muted">
            <PostAuthor userId={post.userId} /> | <TimeAgo timestamp={post.date} />
          </small>
        </div>

        <ReactionButton post={post} />
      </div>
    </article>
  )
}


export default PostExcerpt
