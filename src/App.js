import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import AddPostForm from "./feactures/posts/AddPostForm"
import PostsList from "./feactures/posts/PostsList"
import SinglePostPage from "./feactures/posts/SinglePostPage"
import EditPostForm from './feactures/posts/EditPostForm'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
