import { useSelector } from 'react-redux';
import { getPostError, getPostStatus, selectAllPosts } from './postSlice';
import PostExcerpt from './PostExcerpt';

const PostsList = () => {

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostStatus);
  const error = useSelector(getPostError);

  let content 
  if(postsStatus === 'loading'){
    content =<p>Loading...</p>
  }else if(postsStatus === 'succeeded'){
    const orderedPosts = posts.slice().sort((a,b)=>b.date.localeCompare(a.date))
    content = orderedPosts.map(post=><PostExcerpt key={post.id} post={post}/>)
  }else if(postsStatus === 'failed'){
    content = <p>{error}</p>
  }

  return (
    <section className="container mt-4">
      {content}
    </section>
  );
};

export default PostsList;
