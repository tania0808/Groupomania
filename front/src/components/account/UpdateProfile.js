import React, { useState, useContext, useEffect }  from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import PopupDeleteAccount from './PopupDeleteAccount';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { LocalContext } from '../../context/LocalContext';
import Header from '../header/Header';

/**
 * Updates user information
 * @returns {String} HTML form to update user information
 */
export default function UpdateProfile() {
    let navigate = useNavigate();

    const { localStorageData } = useContext(LocalContext);

    const [user, setUser] = useState({});
    const [image, setImage] = useState(undefined);
    const [userName, setUserName] = useState('');
    const [userPosition, setUserPosition] = useState('');
    const [email, setEmail] = useState('');
    const [imageURL, setImageURL] = useState();

    const [popup, setPopup] = useState(false);
    
    /**
     * Open popup window when clicking on delete button
     */
    function togglePopup () {
        setPopup(!popup);
    }

    /**
     * Do a preview of uploaded image
     * @param {Event} event click on select image button
     */
    const uploadImageToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
            user.userImageURL = event.target.files[0].name;
            setImageURL(URL.createObjectURL(event.target.files[0]));
        }
    };

    const formData = new FormData();
    formData.append('userImageUrl', image);
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('userPosition', userPosition);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ROOT}/auth/profile`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
        .then((response) => {
            setUser(response.data);
            setEmail(response.data.email);
            setUserName(response.data.userName);
            setUserPosition(response.data.userPosition)
        });
    }, []);

    /**
     * 
     * @param {Event} e click on the button Update profile
     */
    const modifyUser = async (e) => {
        e.preventDefault();
        await axios.put(`${process.env.REACT_APP_API_ROOT}/auth/profile`, formData, {
            headers: {
                accessToken: localStorageData
            }
        })
        .then((response) => {
            let loggedInUser = JSON.parse(localStorage.getItem('user'));
            loggedInUser.userName = response.data.user.userName;
            loggedInUser.userImageUrl = response.data.user.userImageUrl;
            loggedInUser.userPosition = response.data.user.userPosition;
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            navigate('/auth/profile');
        });
    }

    /**
     * Delete user account
     */
    async function deleteAccount() {
        await axios.delete(`${process.env.REACT_APP_API_ROOT}/auth/profile`,
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
    <div className='bg-light vh-100'>
        <Header/>
        <div className="col-12 col-xs-8 col-md-8 col-lg-6 col-xl-4 container bg-white d-flex flex-column align-items-center justify-content-center rounded-2 p-0">
            <div className='w-100'>
                <div className={popup ? "d-flex flex-column align-items-center w-100 opacity-25" : "d-flex flex-column align-items-center w-100"}>
                    <div className='bg-profil rounded-top w-100 position-relative d-flex justify-content-between'>
                        {!image
                            ? <img src={user.userImageUrl} alt="user avatar" className="imagePreview rounded-circle position-absolute top-100 start-50 translate-middle" width={100} height={100}/> 
                            : <img src={imageURL} className="imagePreview rounded-circle position-absolute top-100 start-50 translate-middle" alt="user image preview" width={100} height={100}  style={{objectFit: 'cover'}}/>
                        }
                        <div className="form-group profileImageUpload bg-transparent position-absolute">
                            <label htmlFor="userImageUrl" className='profileImageUpload align-items-center p-2 rounded-1 fw-bolder fs-6 d-flex justify-content-center align-items-center'>
                                <FontAwesomeIcon icon={faCamera} />
                            </label>
                            <input type="file" style={{visibility: 'hidden'}} className="form-control-file" id="userImageUrl" onChange={uploadImageToClient} name="userImageUrl"/>
                        </div>
                    </div>
                    <form action="" method='PUT' className='col-md-6 col-sm-10 w-75 flex-center mt-5' encType='multipart/form-data' onSubmit={modifyUser}>
                        <div className="form-group mt-3">
                            <label htmlFor="userName">Set new user name</label>
                            <input 
                            required
                            defaultValue={userName}
                            type='text' 
                            className="form-control" 
                            id="userName"
                            onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="userPosition">Set your position</label>
                            <input 
                            required
                            defaultValue={userPosition}
                            type='text' 
                            className="form-control" 
                            id="userPosition"
                            onChange={(e) => setUserPosition(e.target.value)} />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="email">Set new email</label>
                            <input 
                            required
                            defaultValue={email}
                            type='email' 
                            className="form-control" 
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <a href="#" type='button' onClick={togglePopup} style={{color: 'red'}}>Delete the account</a>
                        </div>
                        <button type='submit' className={"btn btn-primaire mt-3 text-white fw-bold mb-4"}>Update profile</button>
                        <button onClick={() => navigate('/auth/profile')}  className={"btn btn-primaire mt-3 ms-3 text-white fw-bold mb-4"}>Come back</button>
                    </form>
                </div>
                {popup &&
                <PopupDeleteAccount handlePopup={togglePopup} deleteAccount={deleteAccount}/>
                }
            </div>
        </div>
    </div>
  )
}
