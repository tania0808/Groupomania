import React, { useState, useEffect, useContext } from 'react'

import { useNavigate } from 'react-router-dom'

import axios from 'axios';
import { LocalContext } from '../../context/LocalContext';

/**
 * Component to display user information
 * @returns HTML of user information
 */
export default function UserInfo() {
    const { localStorageData } = useContext(LocalContext);
    let navigate = useNavigate();
    const [user, setUser] = useState({}); 

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ROOT}/auth/profile`, {
            headers: {
                accessToken: localStorageData
            }
        })
        .then((response) => {
            setUser(response.data);
        });
    }, [localStorageData]);

  return (
    <div className='w-100'>
        <div className='w-100'>
            <div className='d-flex flex-column align-items-center bg-profil rounded-top'>
                <img src={user.userImageUrl} className="avatar rounded-circle mt-3" alt="user avatar" width={100} height={100} style={{objectFit: 'cover'}} />
            </div>
                <h1 className='d-block fs-4 mt-4 text-center mt-5 pt-3 opacity-75'>{user.userName}</h1>
            <div className="info-user flex-start w-75 mt-5 ms-5 mb-5">
                <span className='fs-6'>Email</span>
                <p className='opacity-75 mt-1'>{user.email}</p>
                <span className='fs-6'>Position</span>
                <p className='opacity-75 mt-1'>{user.userPosition}</p>
                <div className='d-flex flex-column w-100 justify-content-start align-items-start'>
                    <button onClick={() => navigate('/auth/profile/update')} className={"btn btn-primaire text-center d-flex align-items-center justify-content-center flex-center fs-6"}>Update profil</button>
                    <button onClick={() => navigate('/auth/profile/password/update')} className={"btn btn-primaire text-center d-flex mt-2"}>Change password</button>
                </div>
            </div>
        </div>
    </div>
  )
}
