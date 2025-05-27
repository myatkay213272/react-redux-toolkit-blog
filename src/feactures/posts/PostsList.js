import { useSelector } from 'react-redux';
import { selectAllPosts } from './postSlice';

const PostsList = () => {
  const posts = useSelector(selectAllPosts);

  const renderedPosts = posts.map(post => (
    <div className="card mb-3" key={post.id}>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
      </div>
    </div>
  ));

  return (
    <section className="container mt-4">
      <h2 className="mb-4">Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
