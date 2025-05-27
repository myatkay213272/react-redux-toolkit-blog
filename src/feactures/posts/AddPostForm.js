import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postSlice';
import { selectAllUsers } from '../users/userSlice'; 

const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const users = useSelector(selectAllUsers); 

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const onSavePostClicked = (e) => {
    e.preventDefault();
    if (title && content && userId) {
      dispatch(postAdded(title, content, userId));
      setTitle('');
      setContent('');
      setUserId('');
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="container mt-4">
      <h2 className="mb-3">Add a New Post</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="postTitle" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="postTitle"
            value={title}
            onChange={onTitleChanged}
            placeholder="Enter title"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="postAuthor" className="form-label">Author</label>
          <select
            id="postAuthor"
            className="form-select"
            value={userId}
            onChange={onAuthorChanged}
          >
            <option value="">Select user</option>
            {userOptions}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="postContent" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="postContent"
            rows="4"
            value={content}
            onChange={onContentChanged}
            placeholder="Write your post here..."
          ></textarea>
        </div>

        <button
          onClick={onSavePostClicked}
          type="submit"
          className="btn btn-primary"
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
