import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Header from '../../components/header/Header';
import UserInfo from '../../components/UserInfo';
import UpdateProfile from '../../components/UpdateProfile';
import { LocalContext } from '../../Context/LocalContext';

export default function Profile() {

    const { localStorageData } = useContext(LocalContext);

    const [user, setUser] = useState({});
    const [isModif, setModif] = useState(true);
    const [password, setPassword] = useState(false);
    
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState(user.userName);
    const [image, setImage] = useState(undefined);
    
    
    const getUserName = e => {
        setUserName(e.target.value)
    }

    const getEmail = e => {
        setEmail(e.target.value)
    }

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
                accessToken: localStorageData
            }
        })
        .then((response) => {
            setUser(response.data);
            setEmail(response.data.email);
            setUserName(response.data.userName);
        });
    }, []);

    const formData = new FormData();
    formData.append('userImageUrl', image);
    formData.append('userName', userName);
    formData.append('email', email);

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
            
            //window.location = "/auth/profile"
        });

    }

    return (
        <div className='bg-light vh-100'>
            <Header/>
            <div className="container bg-white d-flex flex-column align-items-center justify-content-center rounded-2 p-0">
                {isModif &&
                    <UserInfo 
                        user={user} 
                        toggleProfile={toggleProfile}
                        togglePassword={togglePassword}
                        password={password}
                    />
                }

                {!isModif &&
                    <UpdateProfile 
                        modifyUser={modifyUser} 
                        image={image} 
                        user={user} 
                        clearImage={clearImage}
                        getUserName={getUserName}
                        getEmail={getEmail}
                        setImage={setImage}
                    />
                }

            </div>
        </div>
    )
}
