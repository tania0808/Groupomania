import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './header/Header';
import ShowHidePassword from './ShowHidePassword';

import { LocalContext } from '../Context/LocalContext';

export default function UpdatePassword(props) {
  const navigate = useNavigate();
  const { localStorageData } = useContext(LocalContext);
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState('');
  
  const getPassword = e => {
    setUserPassword(e.target.value)
}

const getConfirmedPassword = e => {
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
    e.preventDefault();
    await axios.put(`http://localhost:3000/auth/profile/password`, { password: userPassword, confirmPassword: confirmPassword}, {
        headers: {
            accessToken: localStorageData
        }
    })
    .then((response) => {
      console.log(response);
      navigate('/auth/profile');
    })
    .catch(err => {
      setError(err.response.data)
    })
  }

  return (
    <div className='bg-light vh-100'>
            <Header/>
            <div className="container bg-white d-flex flex-column align-items-center justify-content-center rounded-2 p-0">
                
      <div className='w-100 d-flex flex-column-reverse align-items-center flex-md-row' >
        <form action="" method='PUT' className='col-10 col-sm-8 col-md-6 flex-start mt-5 ms-md-2' encType='multipart/form-data' onSubmit={updatePassword}>
            <h1 className='fs-3 fw-bolder opacity-75'>Change your password</h1>
            <ShowHidePassword name={'password'} getPassword={getPassword} />
            <ShowHidePassword name={'passwordConfirm'} getPassword={getConfirmedPassword} />
            <div className={"alert mt-3 p-2 " + (error ? 'd-block ' : 'd-none ') + (error ? 'd-block alert-danger' : '')} role="alert" >{error}</div>

            <button onSubmit={updatePassword} className={"btn btn-primaire mt-1 text-white fw-bold mb-4 w-100"}>Update password</button>
            <button onClick={() => navigate('/auth/profile')}  className={"btn btn-primaire text-white fw-bold mb-4 w-100"}>Come back</button>
        </form>
        <div className='passwordInfo w-50 ps-3 pt-3 ps-sm-5 pe-sm-5 mb-4 d-flex flex-column w-100'>
            <h2 className='fs-5'>Password must contain:</h2>
            <ul className="list-group list-group-flush flex-row">
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
