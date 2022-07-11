import React from 'react'
import { Link } from 'react-router-dom'

import Dropdown from '../Dropdown';
import logo from '../../assets/logos/icon-left-font.svg'

export default function Header() {
    const token = localStorage.getItem('accessToken');
  return (
    <div className='header-container d-flex bg-white mb-5 justify-content-center align-items-center'>
        <header className='d-flex justify-content-between align-items-center bg-white'>
            <Link to={token ? '/posts' : '/auth/login'} className="image-container">
                <img className='logo' src={logo} alt="logo groupomania" />
            </Link>
            {!token && (
                <>
                    <Link className='btn btn-primaire ' to='/auth/signup'>Sign Up</Link>
                    <Link className='btn btn-primaire ' to='/auth/login'>Log In</Link>
                </>
            )}
            {token && (
                <div className='d-flex justify-content-between align-items-center bg-white'>
                    <div className="dropdown pe-3">
                        <button className="btn btn-primaire dropdown-toggle m-1 display-6 ps-3 pe-3 pt-1 pb-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>                
                        </button>
                        <Dropdown/>
                    </div>
                </div>
            )}
        </header>
    </div>
  )
}
