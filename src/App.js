import { Routes, Route ,Navigate} from "react-router-dom"
import Layout from "./components/Layout"
import AddPostForm from "./feactures/posts/AddPostForm"
import PostsList from "./feactures/posts/PostsList"
import SinglePostPage from "./feactures/posts/SinglePostPage"
import EditPostForm from './feactures/posts/EditPostForm'
import UsersList from "./feactures/users/UsersList"
import UserPage from "./feactures/users/UserPage"


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

        <Route path="user">
          <Route index element={<UsersList/>}/>
          <Route path=':userId' element={<UserPage/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Route>
    </Routes>
  )
}

export default App
