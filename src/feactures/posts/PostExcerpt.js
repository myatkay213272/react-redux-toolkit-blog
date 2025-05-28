import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButton from './ReactionButton';

const PostExcerpt = ({post}) => {
  return (
    <article className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
        <div className="text-muted small">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
          {/* <TimeAgo timestamp="2025-05-27T09:30:00Z" /> */}
        </div>
        <ReactionButton post={post}/>
      </div>
    </article>
  )
}

export default PostExcerpt