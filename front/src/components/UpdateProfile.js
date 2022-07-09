import React, { useState, useContext }  from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import PopupDeleteAccount from './PopupDeleteAccount';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { LocalContext } from '../Context/LocalContext';

export default function UpdateProfile(props) {
    let navigate = useNavigate();
    const { localStorageData } = useContext(LocalContext);

    const [imageURL, setImageURL] = useState();

    const [popup, setPopup] = useState(false);

    function togglePopup () {
        setPopup(!popup);
    }

    const uploadImageToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            props.setImage(event.target.files[0]);
            props.user.userImageURL = event.target.files[0].name;
            setImageURL(URL.createObjectURL(event.target.files[0]));
        }
    };

    async function deleteAccount() {
        await axios.delete(`http://localhost:3000/auth/profile`,
        {
          headers: {
            accessToken: localStorageData
          }
        })
        .then(() => {
          alert('Account deleted !');
          localStorage.clear();
          navigate('/auth/login', { replace: true });
        })
      }

  return (
      <div className='w-100'>
        <div className={popup ? "d-flex flex-column align-items-center w-100 opacity-25" : "d-flex flex-column align-items-center w-100"}>
                <div className='bg-profil rounded-top w-100 position-relative d-flex justify-content-between'>
                    {!props.image 
                        ? <img src={props.avatar} alt="" className="imagePreview rounded-circle position-absolute top-100 start-50 translate-middle" width={100} height={100}/> 
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
                <form action="" method='PUT' className='col-md-6 col-sm-10 w-75 flex-center mt-5' encType='multipart/form-data'>
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

                    <a href="#" type='button' onClick={togglePopup}>Delete the account</a>
                    </div>
                    <button onClick={props.modifyUser} className={"btn btn-primaire mt-3 text-white fw-bold mb-4"}>Modify profile</button>
                    <button onClick={props.toggleProfile}  className={"btn btn-primaire mt-3 ms-3 text-white fw-bold mb-4"}>Come back</button>
                </form>
        </div>
                    {popup &&
                    <PopupDeleteAccount handlePopup={togglePopup} deleteAccount={deleteAccount}/>
                    }
      </div>
  )
}
