import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getCount, increaseCount } from "../feactures/posts/postSlice"

const Header = () => {

  const dispatch = useDispatch()
  const count = useSelector(getCount)
  return (
    <header className="bg-dark text-white p-3 mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3">Redux Blog</h1>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link to='/' className="nav-link text-white">Home</Link>
            </li>
            <li className="nav-item">
              <Link to='post' className="nav-link text-white">Post</Link>
            </li>
            <li className="nav-item">
              <Link to='user' className="nav-link text-white">Users</Link>
            </li>
          </ul>

          <button onClick={()=>dispatch(increaseCount())}>{count}</button>
        </nav>
      </div>
    </header>
  )
}

export default Header
