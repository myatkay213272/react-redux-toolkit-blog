import { ErrorBoundary } from 'react-error-boundary'
import PostsList from './PostsList' // Make sure the path is correct

// This is what shows if there's an error in PostsList
const ErrorFallback = ({ error }) => (
  <div role="alert" className="alert alert-danger">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
  </div>
)

// This is your new safe wrapper
const PostsListWithErrorBoundary = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PostsList />
    </ErrorBoundary>
  )
}

export default PostsListWithErrorBoundary
