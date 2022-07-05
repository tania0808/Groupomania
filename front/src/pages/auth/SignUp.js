import {React, useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


import Header from '../header/Header'
import './Auth.css'

export default function SignUp() {
    
    let navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState('');
    const [status, setStatus] = useState(''); 
    const [toggle, setToggle] = useState(false);

    const createUser = async (e) => {
        e.preventDefault()
        
        await axios.post("http://localhost:3000/auth/signup", { 
            userName: userName,
            email: email,
            password: password
        })
        .then((response) =>{
            setAlert(response.data.message);
            setStatus(response.data.status)
            setToggle(true);
            if(response.data.status) {
                localStorage.setItem("accessToken", response.data.token);
                localStorage.setItem('user', response.data.user);
                setTimeout(() => {
                  navigate('/posts');
                }, 500);
            }
        })
    }

   
  return (
    <div className='mb-5'>
        <Header/>
        <div className="container mt-5">
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
                    <input required type="password" className="form-control" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <div className={"alert " + (toggle ? 'd-block' : 'd-none ') + (!status ? 'd-block alert-danger' : 'alert-success')} role="alert" >{alert}</div>
                <button onSubmit={createUser} type='submit' className='btn btn-primaire'>Sign Up</button>
            </form>
        </div>
    </div>
  )
}
