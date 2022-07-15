import { React, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios';

import Header from '../../components/header/Header';
import { LocalContext } from '../../context/LocalContext';

/**
 * Login form component
 * @returns {String} HTML of login form
 */
export default function Login() {
  const { setLocalStorageData } = useContext(LocalContext);
  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  /**
   * Login when submitting all data by clicking on log in button
   */
  const login = () => {
    axios.post(`${process.env.REACT_APP_API_ROOT}/auth/login`, {
      email: email,
      password: password
    }).then((response) => {
      if(response.data.status) {
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem('user', response.data.user);
        setLocalStorageData(response.data.token);
        navigate('/posts');
      } else {
        setErrorMessage(response.data.message);
      }
    })
  }

  return (
    <div className='mb-5'>
        <Header/>
        <div className="container mt-5 col-6 col-xs-8 col-md-8 col-lg-8">
          <h1 className='pt-5 mb-3 text-center'>LOG IN</h1>
          <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => {setEmail(e.target.value)}}/>
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
          </div>
          { errorMessage ?
          <p className="p-3 mb-2 alert-danger rounded">{errorMessage}</p> : null}
          <button className='btn btn-primaire d-block' onClick={login}>Log In</button>  
        </div>
    </div>
  )
}
