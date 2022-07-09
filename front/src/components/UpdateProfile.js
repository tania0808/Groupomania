import React, { useState, useContext, useEffect }  from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import PopupDeleteAccount from './PopupDeleteAccount';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { LocalContext } from '../Context/LocalContext';
import Header from './header/Header';

export default function UpdateProfile(props) {
    let navigate = useNavigate();
    const { localStorageData } = useContext(LocalContext);
    const [user, setUser] = useState({})
    const [image, setImage] = useState(undefined);
    const [imageURL, setImageURL] = useState();

    const [popup, setPopup] = useState(false);
    
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');

    
    function togglePopup () {
        setPopup(!popup);
    }

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

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/profile`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
        .then((response) => {
            setUser(response.data);
            setEmail(response.data.email);
            setUserName(response.data.userName);
        });
    }, []);

    const modifyUser = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3000/auth/profile`, formData, {
            headers: {
                accessToken: localStorageData
            }
        })
        .then((response) => {
            let loggedInUser = JSON.parse(localStorage.getItem('user'));
            loggedInUser.userName = response.data.user.userName;
            loggedInUser.userImageUrl = response.data.user.userImageUrl;
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            navigate('/auth/profile');
        });
    }

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
    <div className='bg-light vh-100'>
    <Header/>
    <div className="container bg-white d-flex flex-column align-items-center justify-content-center rounded-2 p-0">
      <div className='w-100'>
        <div className={popup ? "d-flex flex-column align-items-center w-100 opacity-25" : "d-flex flex-column align-items-center w-100"}>
                <div className='bg-profil rounded-top w-100 position-relative d-flex justify-content-between'>
                    {!image
                        ? <img src={user.userImageUrl} alt="" className="imagePreview rounded-circle position-absolute top-100 start-50 translate-middle" width={100} height={100}/> 
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
                        <label htmlFor="email">Set new email</label>
                        <input 
                        required
                        defaultValue={email}
                        type='email' 
                        className="form-control" 
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}/>

                    <a href="#" type='button' onClick={togglePopup}>Delete the account</a>
                    </div>
                    <button type='submit' className={"btn btn-primaire mt-3 text-white fw-bold mb-4"}>Modify profile</button>
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
