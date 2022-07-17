import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../header/Header';
import ShowHidePassword from './ShowHidePassword';
import PasswordValidator from './PasswordValidator';

import { LocalContext } from '../../context/LocalContext';

/**
 * Component to update a passsword
 * @returns {String} HTML for updating a password
 */
export default function UpdatePassword() {
  const navigate = useNavigate();

  const { localStorageData } = useContext(LocalContext);
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState('');
  
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false
  });

  const handleOnKeyUp = (e) => {
    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length > 8;
    const specialCharCheck = /[^A-Za-z0-9]/.test(value);
    setChecks({
        capsLetterCheck,
        numberCheck,
        pwdLengthCheck,
        specialCharCheck
    })
}
  /**
   * get password from the input
   * @param {Event} e 
   */
  const getPassword = e => {
    setUserPassword(e.target.value)
  } 
  /**
   * get confirmation of password from the input
   * @param {Event} e 
   */
  const getConfirmedPassword = e => {
    setConfirmedPassword(e.target.value)
  }

  const formData = new FormData();
    formData.append('password', userPassword);
    formData.append('passwordConfirm', confirmPassword);

    /**
     * Updates a password when clicking on update after password insertion
     * @param {Event} e 
     */
  const updatePassword = async (e) => {
    e.preventDefault();
    await axios.put(`${process.env.REACT_APP_API_ROOT}/auth/profile/password`, { password: userPassword, confirmPassword: confirmPassword}, {
      headers: {
          accessToken: localStorageData
      }
    })
    .then((response) => {
      setError(response.data.message);
      navigate('/auth/profile');
    })
    .catch(err => {
      setError(err.response.data)
    })
  }

  return (
    <div className='bg-light vh-100 col-12'>
      <Header/>
      <div className="col-12 col-xs-8 col-md-10 col-lg-8 col-xl-6 container bg-white d-flex flex-column align-items-center justify-content-center rounded-2 p-0">     
        <div className='w-100 d-flex flex-column align-items-center flex-xl-row' >
          <form action="" method='PUT' className='col-10 col-md-8 col-lg-6 col-xl-6 flex-start pt-md-5 ps-lg-3 ps-md-1' encType='multipart/form-data' onSubmit={updatePassword}>
            <h1 className='fs-3 fw-bolder opacity-75'>Change your password</h1>
            <ShowHidePassword name={'password'} getPassword={getPassword} value={'New password'} onKeyUp={handleOnKeyUp} />
            <ShowHidePassword name={'passwordConfirm'} getPassword={getConfirmedPassword} value={'Confirm new password'} />
            <div className={"alert mt-3 p-2 " + (error ? 'd-block ' : 'd-none ') + (error ? 'd-block alert-danger' : '')} role="alert" >{error}</div>
            <button  disabled={!userPassword || !confirmPassword || !checks.capsLetterCheck || !checks.numberCheck || !checks.pwdLengthCheck || !checks.specialCharCheck }  onSubmit={updatePassword} className={"btn btn-primaire mt-3 text-white fw-bold mb-4 w-100"}>Update password</button>
            <button onClick={() => navigate('/auth/profile')}  className={"btn btn-primaire text-white fw-bold mb-4 w-100"}>Come back</button>
          </form>

          <div className='col-10 col-xs-8 col-md-8 col-lg-6 col-xl-6 ps-1 pt-1 ps-sm-2 pe-sm-2 mb-4 d-flex flex-column justify-content-center align-items-center'>
            <h2 className='fs-6'>Password must contain:</h2>
            <div className='col-lg-8 justify-content-center'>
              <PasswordValidator
              checks={checks}
              capsLetterFlag={ checks.capsLetterCheck ? true : false }
              numberFlag={ checks.numberCheck ? true : false}
              pwdLengthFlag={ checks.pwdLengthCheck ? true : false }
              specialCharFlag={ checks.specialCharCheck ? true : false }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
