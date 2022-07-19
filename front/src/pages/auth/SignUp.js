import { React, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Header from '../../components/header/Header';
import { LocalContext } from '../../context/LocalContext';
import PasswordValidator from '../../components/account/PasswordValidator';

/**
 * Sign up form component
 * @returns  HTML of Sign up form
 */
export default function SignUp() {
    const { setLocalStorageData } = useContext(LocalContext);
    
    let navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
 
    const [pwdRequisite, setPwdRequisite] = useState(false);

    const [checks, setChecks] = useState({
        capsLetterCheck: false,
        numberCheck: false,
        pwdLengthCheck: false,
        specialCharCheck: false
    });
    
    /**
     * Open password strength checks
     */
    const handleOnFocus = () => {
        setPwdRequisite(true);
    }

    /**
     * Close password strength checks
     */
    const handleOnBlur = () => {
        setPwdRequisite(false);
    }

    /**
     * Setting checks points to true or false
     * @param {Event} e on entering a password
     */
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
     * Create a user and login
     * @param {Event} e click on Sign in button
     */
    const createUser = async (e) => {
        e.preventDefault();

        await axios.post(`${process.env.REACT_APP_API_ROOT}/auth/signup`, { 
            userName: userName,
            email: email,
            password: password
        })
        .then((response) =>{
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
        <div className="container mt-5 col-10 col-xs-8 col-md-8 col-lg-8">
            <h1 className='pt-5 mb-3 text-center'>SIGN UP</h1>
            <form action="" method='POST' className='col-md-8 m-auto' onSubmit={createUser}>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input required type="text" className="form-control" id="userName" placeholder="jane_doe" onChange={(e) => {setUserName(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input required  type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input required 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onKeyUp={handleOnKeyUp}
                    />
                </div>
                { pwdRequisite ? 
                <PasswordValidator
                    checks={checks}
                    capsLetterFlag={ checks.capsLetterCheck ? true : false }
                    numberFlag={ checks.numberCheck ? true : false}
                    pwdLengthFlag={ checks.pwdLengthCheck ? true : false }
                    specialCharFlag={ checks.specialCharCheck ? true : false }
                /> 
                : null }

                { errorMessage ?
                <div className={"alert alert-danger"} >{errorMessage}</div>
                : null
                }
                <button disabled={!email || !userName || !checks.capsLetterCheck || !checks.numberCheck || !checks.pwdLengthCheck || !checks.specialCharCheck } onSubmit={createUser} type='submit' className='btn btn-primaire'>Sign Up</button>
            </form>
        </div>
    </div>
  )
}
