import React from 'react'
import logo from '../../assets/logos/icon-left-font.svg'
import './Header.css'
import { Link } from 'react-router-dom'
import Dropdown from '../button/Dropdown'

export default function Header() {
    const token = localStorage.getItem('accessToken')

  return (
    <div>
        <header className='d-flex justify-content-between align-items-center bg-white mb-5'>
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
                <>
                    <div className='d-flex justify-content-between align-items-center bg-white'>
                        <div className="dropdown">
                            <button className="btn btn-primaire dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>                
                            </button>
                            <Dropdown/>
                        </div>
                        <Link className='btn btn-primaire h-100 m-3' to='/createpost'>Add a post</Link>
                    </div>
                    
                </>
            )}

        </header>
    </div>
  )
}
