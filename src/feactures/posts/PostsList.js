import { useSelector } from 'react-redux';
import { selectAllPosts } from './postSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButton from './ReactionButton';

const PostsList = () => {
  const posts = useSelector(selectAllPosts);

  const orderedPosts = posts.slice().sort((a,b)=> b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map(post => (
    <article className="card mb-3 shadow-sm" key={post.id}>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
        <div className="text-muted small">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
          {/* <TimeAgo timestamp="2025-05-27T09:30:00Z" /> */}
        </div>
        <ReactionButton post={post}/>
      </div>
    </article>
  ));

  return (
    <section className="container mt-4">
      <h2 className="mb-4">Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
