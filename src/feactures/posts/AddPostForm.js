import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { postAdded } from './postSlice';

const AddPostForm = () => {

    const dispatch = useDispatch()
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')

    const onTitleChanged = (e)=>setTitle(e.target.value)
    const onContentChanged = (e)=>setContent(e.target.value)

    const onSvePostClicked = (e)=>{
        e.preventDefault()
        if(title && content){
            dispatch(
                postAdded({
                    id : nanoid(),
                    title,
                    content
                })
            )
            setTitle('')
            setContent('')
        }
    }

  return (
    <section className="container mt-4">
      <h2 className="mb-3">Add a New Post</h2>
      <form>
        <div className="mb-3">
          <label 
                htmlFor="postTitle" 
                className="form-label"
            >Title</label>
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
          <label 
            htmlFor="postContent" 
            className="form-label"
            >Content</label>
          <textarea 
            className="form-control" 
            id="postContent" 
            rows="4"
            value={content}
            onChange={onContentChanged}
            placeholder="Write your post here..."></textarea>
        </div>
        <button 
            onClick={onSvePostClicked}
            type="submit" 
            className="btn btn-primary"
        >Submit Post</button>
      </form>
    </section>
  );
};

export default AddPostForm;
