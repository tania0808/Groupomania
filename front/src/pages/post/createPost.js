import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './CreatePost.css'
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Post() {

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState();

  const uploadImageToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
        setImage(event.target.files[0]);
        setImageURL(URL.createObjectURL(event.target.files[0]));
    }
};

  const formData = new FormData();
  formData.append('imageUrl', image);
  formData.append('title', title);
  formData.append('postText', postText);

  const createPost = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/posts", formData, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then(response => {
    })
    window.location = "/posts"
  }



  return (
      <div className='createPostPage mb-5 bg-white d-flex flex-column justify-content-center align-items-center pb-3'>
        <form action="" method='POST' className='col-md-10' onSubmit={createPost} encType='multipart/form-data'>
        <div className='d-flex align-items-center mt-3'>
          <img className='userImage' src="https://annu-recherche.inspe-lille-hdf.fr/img/avatar_defaut.png" alt="" />
          <div className="userInfo ms-3">
            <p className='fw-bold'>Tania</p>
            <span className='fw-light'>Junior React Developper</span>
          </div>
        </div>
        {image && <img src={imageURL} className="mt-3 w-100" />}
          {/* <div className="form-group mt-5">
            <label htmlFor="title">Title of your post</label>
            <input type='text' className="form-control" id="title" rows="1" required onChange={(e) => setTitle(e.target.value)}></input>
          </div> */}
          <div className="form-group mt-2">
            <input placeholder="Qu'avez-vous à partager ?" type='text' className="form-control border border-white pb-5" id="postText" rows="3" required onChange={(e) => setPostText(e.target.value)}/>
            <hr className='text-secondary'/>
          </div>
          <div className='d-flex align-items-center'>
            <div className="form-group w-25 imageUpload pb-4">
              <label htmlFor="imageUrl" className='bg-light p-2 rounded-1 fw-bolder fs-6'><FontAwesomeIcon className='pe-2' icon={faCamera} />Image</label><br />
              <input type="file" style={{visibility: 'hidden'}} className="form-control-file hidden" id="imageUrl" onChange={(e) => uploadImageToClient(e)} name="imageUrl"/>
            </div>
            <button type='submit' className='btn btn-primaire btn-sm text-white fw-bold'>Create post</button>
          </div>
        </form>
      </div>
  )
}
