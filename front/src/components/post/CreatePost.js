import React,{ useState, useContext } from 'react'
import axios from 'axios';

import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

import { LocalContext } from '../../context/LocalContext';
import PostHeader from './PostHeader'


export default function CreatePost(props) {
  const { userName, userImageUrl, userPosition } = props.currentUser;
  const { localStorageData } = useContext(LocalContext);

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
    await axios.post(`${process.env.REACT_APP_API_ROOT}/posts`, formData,  {
      headers: {
        accessToken: localStorageData
      }
    }).then(response => {
      props.postListChanger(response.data);
      clearForm();
    })
  }

  return (
    <div className='form-container d-flex flex-column justify-content-center align-items-center pb-3 m-3'>
      <form action="" method='POST' className='createPostPage bg-white ps-3 pe-3 ' onSubmit={createPost} encType='multipart/form-data'>
        <div className='d-flex align-items-center mt-3 justify-content-start'>
          <PostHeader userName={userName} avatar={userImageUrl} userPosition={userPosition} />
        </div>
        { image && <img src={imageURL} alt="post image" className="mt-3 w-100" /> }
        <div className="form-group">
          <label htmlFor="postText"></label>
          <input type='text' value={postText} placeholder="Qu'avez-vous à partager ?" className="form-control border border-white pb-2" id="postText" rows="3" required onChange={(e) => setPostText(e.target.value)}/>
          <hr/>
        </div>
        <div className='d-flex align-items-center justify-content-between mb-3'>
          <div className="form-group imageUpload bg-light d-flex pe-3 align-items-center justify-content-between">
            <label htmlFor="imageUrl" className='inputFileLabel align-items-center p-2 rounded-1 fw-bolder fs-6 d-flex'>
              <FontAwesomeIcon className='pe-2' icon={faCamera} />Image
            </label>
            <input type="file" style={{visibility: 'hidden'}} className="form-control-file" id="imageUrl" onChange={(e) => {uploadImageToClient(e)}} name="imageUrl"/>
            <FontAwesomeIcon className='p-1 resetImage' icon={faXmark} onClick={clearImage}/><br />
          </div>
          <button type={'submit'} className={"btn btn-primaire m-4 py-2"}>Create post</button>
        </div>
      </form>
    </div>
  )
}
