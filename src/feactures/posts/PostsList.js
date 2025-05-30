import { useSelector } from 'react-redux';
import { useGetPostsQuery, selectPostIds } from './postSlice';
import PostExcerpt from './PostExcerpt';

const PostsList = () => {
   const { isLoading, isSuccess, isError, error } = useGetPostsQuery()

  const orderedPostIds = useSelector(selectPostIds) || []

  let content 
  if(isLoading){
    content =<p>Loading...</p>
  }else if (isSuccess && Array.isArray(orderedPostIds)) {
  content = orderedPostIds.map(postId => (
    <PostExcerpt key={postId} postId={postId} />
  ))
  }else if (isError) {
    content = <p>{error?.data?.message || error?.status || "Error loading posts"}</p>;
  }

  return (
    <section className="container mt-4">
      {content}
    </section>
  );
};

export default PostsList;
