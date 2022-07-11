import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Header from '../../components/header/Header';
import UserInfo from '../../components/UserInfo';
import UpdateProfile from '../../components/UpdateProfile';
import { LocalContext } from '../../Context/LocalContext';

export default function Profile() {
    const { localStorageData } = useContext(LocalContext);

    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState('');
    const [isModif, setModif] = useState(true);
    const [changePassword, setChangePassword] = useState(false);
    
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState(undefined);
    
    function toggleProfile() {
        setModif(!isModif);
    }
    
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
            setAvatar(response.data.userImageUrl);
            setModif(true);
        });
    }, []);

    const formData = new FormData();
    formData.append('userImageUrl', image);
    formData.append('userName', userName);
    formData.append('email', email);

    return (
        <div className='bg-light vh-100'>
            <Header/>
            <div className="container bg-white d-flex flex-column align-items-center justify-content-center rounded-2 p-0">
                <UserInfo 
                    user={user} 
                    avatar={avatar}
                    password={changePassword}
                />
            </div>
        </div>
    )
}
