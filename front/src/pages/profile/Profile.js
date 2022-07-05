import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import Button from '../../components/Button';

export default function Profile() {

    const [user, setUser] = useState({});
    const [isModif, setModif] = useState(true);
    const [password, setPassword] = useState(false);
    
    
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
    
    const modifyUser = async (e) => {

        
        e.preventDefault();
        await axios.put(`http://localhost:3000/auth/profile`, { userName: user.userName, email: user.email} , {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
        .then((response) => {
            let loggedInUser = JSON.parse(localStorage.getItem('user'));
            loggedInUser.userName = response.data.userName
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            
            window.location = "/auth/profile"
        });

    }

    return (
        <div>
            <Header/>
            <div className="container bg-light d-flex flex-column align-items-center justify-content-center rounded-2">
                <img src={user.userImageUrl} className="rounded-circle mt-3" alt="user image" width={100} />
                <h1 className='fs-4 mt-4'>{user.userName}</h1>

                {isModif &&
                <div className='w-100'>
                    <div className='d-flex w-100 justify-content-center'>
                        <Button onClick={toggleProfile} class={"btn btn-primaire text-center m-4 py-3 d-flex align-items-center justify-content-center flex-center"} value={"UPDATE PROFILE"}/>
                    </div>

                    <div className="info-user flex-start w-75 mt-5 ms-5">
                        <span className='fs-6'>User name</span>
                        <p className='opacity-75 mt-1'>{user.userName}</p>
                        <span className='fs-6'>Email</span>
                        <p className='opacity-75 mt-1'>{user.email}</p>
                        <Button onClick={() => alert('Change password')} class={"btn btn-primaire text-center py-3 mt-5 d-flex align-items-center"} value={"Change password"}/>
                    </div>
                </div>
                }
                {!isModif &&
                <form action="" method='POST' className='col-md-6 col-sm-10 w-75 flex-start' encType='multipart/form-data' onSubmit={modifyUser}>
                    <div className="form-group mt-3">
                        <label htmlFor="userName">Set new user name</label>
                        <input 
                        defaultValue={user.userName} 
                        type='text' 
                        className="form-control" 
                        id="userName" required
                        onChange={(e) => user.userName = e.target.value } />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Set new email</label>
                        <input 
                        defaultValue={user.email} 
                        type='text' 
                        className="form-control" 
                        id="email"
                        required
                        onChange={(e) => user.email = e.target.value }/>
                    </div>
                    <Button type={'submit'} class={"btn btn-primaire mt-3 text-white fw-bold mb-4"} value={"Modify profile"}/>
                    <Button onClick={toggleProfile} type={'submit'} class={"btn btn-primaire mt-3 ms-3 text-white fw-bold mb-4"} value={"Come back"}/>
                </form>
                }
            </div>
        </div>
    )
}
