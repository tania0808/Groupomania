import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import axios from 'axios';

export default function UserInfo() {
    let navigate = useNavigate();
    const [user, setUser] = useState({}); 

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

  return (
    <div className='w-100'>
        <div className='w-100'>
            <div className='d-flex flex-column align-items-center bg-profil rounded-top'>
                <img src={user.userImageUrl} className="avatar rounded-circle mt-3" alt="user image" width={100} height={100} style={{objectFit: 'cover'}} />
            </div>
                <h1 className='d-block fs-4 mt-4 text-center mt-5 pt-3 opacity-75'>{user.userName}</h1>
            <div className="info-user flex-start w-75 mt-5 ms-5 mb-5">
                <span className='fs-6'>Email</span>
                <p className='opacity-75 mt-1'>{user.email}</p>
                <span className='fs-6'>Position</span>
                <p className='opacity-75 mt-1'>{user.userPosition}</p>
                <div className='d-flex flex-column w-100 justify-content-start align-items-start'>
                    <button onClick={() => navigate('/auth/profile/update')} className={"btn btn-primaire text-center py-3 d-flex align-items-center justify-content-center flex-center fs-6"}>Update profil</button>
                    <button onClick={() => navigate('/auth/profile/password/update')} className={"btn btn-primaire text-center d-flex mt-2"}>Change password</button>
                </div>
            </div>
        </div>
    </div>
  )
}
