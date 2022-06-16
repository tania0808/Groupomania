import {React, useState} from 'react'
import Header from '../header/Header'
import './Auth.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


export default function Login() {
  
  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const [status, setStatus] = useState(''); 
  const [toggle, setToggle] = useState(false);

  const login = () => {
    axios.post("http://localhost:3000/auth/login", {
      email: email,
      password: password
    }).then((response) => {
      setAlert(response.data.message);
      setStatus(response.data.status)
      setToggle(true);
      if(response.data.status) {
        navigate('/')
    }
    })
  }

  return (
    <div>
        <Header/>
        <div className="container">
            <h1 className='mb-3'>Log In</h1>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <div className={"alert " + (toggle ? 'd-block ' : 'd-none ') + (!status ? 'd-block alert-danger ' : 'alert-success')} role="alert" >{alert}</div>
            <button className='btn btn-primaire' onClick={login}>Log In</button>
            
        </div>
    </div>
  )
}
