import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import Button from '../../components/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {

    const [user, setUser] = useState({});
    const [isModif, setModif] = useState(true);
    const [password, setPassword] = useState(false);
    
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState(undefined);
    const [imageURL, setImageURL] = useState();
    
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
    
    function clearImage() {
        setImage('');
    }
    
    function toggleProfile() {
        setModif(!isModif);
    }
    
    function togglePassword() {
        setPassword(!password);
    }
    
    useEffect(() => {
        axios.get(`http://localhost:3000/auth/profile`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
        .then((response) => {
            setUser(response.data);
        });
    }, []);

    //{ userName: user.userName, email: user.email, userImageUrl: image}
    const modifyUser = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3000/auth/profile`, formData, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
        .then((response) => {
            let loggedInUser = JSON.parse(localStorage.getItem('user'));
            loggedInUser.userName = response.data.user.userName;
            loggedInUser.userImageUrl = response.data.user.userImageUrl;
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            
            window.location = "/auth/profile"
        });

    }

    return (
        <div>
            <Header/>
            <div className="container bg-light d-flex flex-column align-items-center justify-content-center rounded-2">

                {isModif &&
                <div className='w-100'>
                    <div className='d-flex flex-column align-items-center'>
                        <img src={user.userImageUrl} className="avatar rounded-circle mt-3" alt="user image" width={100} height={100} style={{objectFit: 'cover'}} />
                        <h1 className='fs-4 mt-4'>{user.userName}</h1>
                    </div>

                    <div className="info-user flex-start w-75 mt-5 ms-5 mb-5">
                        <span className='fs-6'>User name</span>
                        <p className='opacity-75 mt-1'>{user.userName}</p>
                        <span className='fs-6'>Email</span>
                        <p className='opacity-75 mt-1'>{user.email}</p>
                        <div className='d-flex flex-column w-100 justify-content-start align-items-start'>
                            <Button onClick={toggleProfile} class={"btn btn-primaire text-center py-3 d-flex align-items-center justify-content-center flex-center fs-6"} value={"Update profil"}/>
                            <Button onClick={() => alert('Change password')} class={"btn btn-primaire text-center d-flex mt-2"} value={"Change password"}/>
                        </div>
                    </div>
                </div>
                }
                {!isModif &&
                <form action="" method='POST' className='col-md-6 col-sm-10 w-75 flex-start' encType='multipart/form-data' onSubmit={modifyUser}>
                    {!image 
                        ? <img src={user.userImageUrl} alt="" className="mt-3 rounded-circle" width={100} height={100}/> 
                        : <img src={imageURL} className="rounded-circle mt-3" alt="user image" width={100} height={100}  style={{objectFit: 'cover'}}/>
                    }
                    <h1 className='fs-4 mt-4'>{user.userName}</h1>
                    
                    <div className="form-group imageUpload bg-light d-flex pe-3 align-items-center justify-content-between">
                        <label htmlFor="userImageUrl" className='inputFileLabel align-items-center p-2 rounded-1 fw-bolder fs-6 d-flex'>
                            <FontAwesomeIcon className='pe-2' icon={faCamera} />Image
                        </label>
                        <input type="file" style={{visibility: 'hidden'}} className="form-control-file" id="userImageUrl" onChange={uploadImageToClient} name="userImageUrl"/>
                        <FontAwesomeIcon className='p-1 resetImage' icon={faXmark} onClick={clearImage}/><br />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="userName">Set new user name</label>
                        <input 
                        defaultValue={user.userName}
                        type='text' 
                        className="form-control" 
                        id="userName" required
                        onChange={(e) => setUserName(e.target.value) } />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Set new email</label>
                        <input 
                        defaultValue={user.email}
                        type='text' 
                        className="form-control" 
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <Button type={'submit'} class={"btn btn-primaire mt-3 text-white fw-bold mb-4"} value={"Modify profile"}/>
                    <Button onClick={toggleProfile} type={'submit'} class={"btn btn-primaire mt-3 ms-3 text-white fw-bold mb-4"} value={"Come back"}/>
                </form>
                }
            </div>
        </div>
    )
}
