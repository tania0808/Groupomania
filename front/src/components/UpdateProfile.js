import React, { useState }  from 'react'
import Button from './Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function UpdateProfile(props) {

    const [imageURL, setImageURL] = useState();
    console.log(imageURL);

    const uploadImageToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            props.setImage(event.target.files[0]);
            props.user.userImageURL = event.target.files[0].name;
            setImageURL(URL.createObjectURL(event.target.files[0]));
        }
    };

  return (
      <div className="d-flex flex-column align-items-center w-100">
            <div className='bg-profil rounded-top w-100 position-relative d-flex justify-content-between'>
                {!props.image 
                    ? <img src={props.user.userImageUrl} alt="" className="imagePreview rounded-circle position-absolute top-100 start-50 translate-middle" width={100} height={100}/> 
                    : <img src={imageURL} className="imagePreview rounded-circle position-absolute top-100 start-50 translate-middle" alt="user image" width={100} height={100}  style={{objectFit: 'cover'}}/>
                }
                <div className="form-group profileImageUpload bg-transparent position-absolute">
                    <label htmlFor="userImageUrl" className='profileImageUpload align-items-center p-2 rounded-1 fw-bolder fs-6 d-flex justify-content-center align-items-center'>
                        <FontAwesomeIcon icon={faCamera} />
                    </label>
                    <input type="file" style={{visibility: 'hidden'}} className="form-control-file" id="userImageUrl" onChange={uploadImageToClient} name="userImageUrl"/>
                    
                    {/* {imageURL &&
                        <FontAwesomeIcon className='resetImage' icon={faXmark} onClick={props.clearImage}/>
                    } */}
                </div>
            </div>
            <form action="" method='PUT' className='col-md-6 col-sm-10 w-75 flex-center mt-5' encType='multipart/form-data' onSubmit={props.modifyUser}>
                <div className="form-group mt-3">
                    <label htmlFor="userName">Set new user name</label>
                    <input 
                    defaultValue={props.user.userName}
                    type='text' 
                    className="form-control" 
                    id="userName" required
                    onChange={props.getUserName} />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="email">Set new email</label>
                    <input 
                    defaultValue={props.user.email}
                    type='email' 
                    className="form-control" 
                    id="email"
                    onChange={props.getEmail}/>
                </div>
                <Button type={'submit'} class={"btn btn-primaire mt-3 text-white fw-bold mb-4"} value={"Modify profile"}/>
                <Button onClick={props.toggleProfile} type={'submit'} class={"btn btn-primaire mt-3 ms-3 text-white fw-bold mb-4"} value={"Come back"}/>
            </form>
      </div>
  )
}
