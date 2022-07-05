import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import Header from '../../components/header/Header';


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
      if(!response.data.status){
        setAlert(response.data.message);
        setStatus(response.data.status)
        setToggle(true);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem('user', response.data.user);
      }
      if(response.data.status) {
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
            <h1 className='pt-5 mb-3 text-center'>LOG IN</h1>
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
