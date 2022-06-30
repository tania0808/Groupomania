import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './CreatePost.css'
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Post(props) {

  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");

  const uploadImageToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
        setImage(event.target.files[0]);
        setImageURL(URL.createObjectURL(event.target.files[0]));
    }
};

  function clearImage() {
    setImage('');
  }

  function clearForm() {
    setImage('');
    setPostText('');
  }
 


  const formData = new FormData();
  formData.append('imageUrl', image);
  formData.append('postText', postText);

  const createPost = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/posts", formData,  {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then(response => {
      props.postListChanger(response.data);
      clearForm();
      console.log(postText);
    })
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
        {image && <img src={imageURL} alt="" className="mt-3 w-100" />}
          <div className="form-group">
            <label htmlFor="postText"></label>
            <input type='text' value={postText} placeholder="Qu'avez-vous à partager ?" className="form-control border border-white pb-2" id="postText" rows="3" required onChange={(e) => setPostText(e.target.value)}/>
            <hr/>
          </div>
          <div className='d-flex align-items-center'>
            <div className="form-group w-25 imageUpload pb-4">
              <label htmlFor="imageUrl" className='bg-light p-2 rounded-1 fw-bolder fs-6'><FontAwesomeIcon className='pe-2' icon={faCamera} />Image</label><FontAwesomeIcon className='ps-1' icon={faXmark} onClick={clearImage}/><br />
              <input type="file" style={{visibility: 'hidden'}} className="form-control-file" id="imageUrl" onChange={(e) => {uploadImageToClient(e)}} name="imageUrl"/>
            </div>
            <button type='submit' className='btn btn-primaire btn-sm text-white fw-bold'>Create post</button>
          </div>
        </form>
      </div>
  )
}
