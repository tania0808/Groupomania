import React from 'react'
import { useState } from 'react'
import Header from '../header/Header'
import axios from 'axios';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js'



export default function Post() {

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
 
  const formData = new FormData();
  formData.append('imageUrl', image);
  formData.append('title', title);
  formData.append('postText', postText);
  formData.append('userName', 'tania');




  const createPost = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:3000/posts", formData, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
  });
    window.location = "/"
  }



  return (
    <div className='createPostPage'>
      <Header/>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <h1>Create a post</h1>
        <form action="" method='POST' className='col-md-8' onSubmit={createPost} encType='multipart/form-data'>
          <div className="form-group mt-5">
            <label htmlFor="title">Title of your post</label>
            <input type='text' className="form-control" id="title" rows="1" required onChange={(e) => setTitle(e.target.value)}></input>
          </div>
          <div className="form-group mt-5">
            <label htmlFor="postText">Share your thoughts</label>
            <input type='text' className="form-control p-5" id="postText" rows="3" required onChange={(e) => setPostText(e.target.value)}/>
          </div>
          <div className="form-group mt-5">
            <label htmlFor="imageUrl">Choose the image if you want</label><br />
            <input type="file" className="form-control-file" id="imageUrl" onChange={(e) => setImage(e.target.files[0])} name="imageUrl"/>
          </div>
          <button type='submit' className='btn btn-primaire mt-5 text-white fw-bold'>Create post</button>
        </form>
      </div>
    </div>
  )
}
