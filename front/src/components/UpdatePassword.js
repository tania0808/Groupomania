import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './header/Header';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { LocalContext } from '../Context/LocalContext';

export default function UpdatePassword(props) {
  const navigate = useNavigate();
  const { localStorageData } = useContext(LocalContext);
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmedPassword] = useState('');
  
  const getPassword = e => {
    console.log(e.target.value);
    setUserPassword(e.target.value)
}

const getConfirmedPassword = e => {
    console.log(e.target.value);
    setConfirmedPassword(e.target.value)
}
  const formData = new FormData();
    formData.append('password', userPassword);
    formData.append('passwordConfirm', confirmPassword);

  const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = (e) => {
        setPasswordShown(!passwordShown);
    }

  const updatePassword = async (e) => {
    await axios.put(`http://localhost:3000/auth/profile/password`, { password: userPassword, confirmPassword: confirmPassword}, {
        headers: {
            accessToken: localStorageData
        }
    })
    .then((response) => {
        props.togglePassword();
    });
  }

  return (
    <div className='bg-light vh-100'>
            <Header/>
            <div className="container bg-white d-flex flex-column align-items-center justify-content-center rounded-2 p-0">
                
      <div className='w-100 ps-4 d-flex' >
        <form action="" method='PUT' className='col-md-6 col-sm-8 w-50 flex-start mt-5' encType='multipart/form-data' onSubmit={updatePassword}>
            <h1 className='fs-3 fw-bolder opacity-75'>Change your password</h1>
            <div className="form-group mt-3 position-relative">
              <label htmlFor={'password'}>New Password</label>
              <input 
              type={passwordShown ? 'text' : 'password'} 
              className="form-control col-sm-6" 
              onChange={getPassword}
              id={'password'}/>
              <FontAwesomeIcon icon={faEye} 
              onClick={togglePassword}
              className="position-absolute top-50 end-0 pe-3"
                />
            </div>

            <div className="form-group mt-3 position-relative">
              <label htmlFor={'passwordConfirm'}>Confirm New Password</label>
              <input 
              type={passwordShown ? 'text' : 'password'} 
              className="form-control col-sm-6" 
              onChange={getConfirmedPassword}
              id={'passwordConfirm'}/>
              <FontAwesomeIcon icon={faEye} 
              onClick={(e) => togglePassword(e)}
              className="position-absolute top-50 end-0 pe-3"
                />
            </div>
            {/* <Password id={'password'} value={'New Password'} onChange={setUserPassword}/>
            <Password id={'password-confirm'} value={'Confirm New Password'} onChange={(e) => console.log(e.target.value)}/> */}

            <button className={"btn btn-primaire mt-3 text-white fw-bold mb-4 w-100"}>Update password</button>
            <button onClick={() => navigate('/auth/profile')}  className={"btn btn-primaire text-white fw-bold mb-4 w-100"}>Come back</button>
        </form>
        <div className='passwordInfo w-50 ps-5 pe-5 mt-auto mb-4 mx-auto'>
            <h2 className='fs-5'>Password must contain:</h2>
            <ul className="list-group list-group-flush">
                <li className="list-group-item border-0">At least one uppper-case letter (A-Z)</li>
                <li className="list-group-item border-0">At least 1 number(0-9)</li>
                <li className="list-group-item border-0">At least 8 characters</li>
            </ul>
        </div>
      </div>
      </div>
      </div>
  )
}
