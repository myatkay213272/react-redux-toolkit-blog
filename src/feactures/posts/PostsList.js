import { useSelector } from 'react-redux';
import { selectPostIds, useGetPostsQuery } from './postSlice';
import PostExcerpt from './PostExcerpt';



const PostsList = () => {

  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()

  const orderedPostIds = useSelector(selectPostIds)

  let content 
  if(isLoading){
    content =<p>Loading...</p>
  }else if(isSuccess){
    content = orderedPostIds.map(post=><PostExcerpt key={post.id} post={post}/>)
  }else if(isError){
    content = <p>{error}</p>
  }

  return (
    <section className="container mt-4">
      {content}
    </section>
  );
};

export default PostsList;
