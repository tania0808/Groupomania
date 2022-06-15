import React from 'react'
import logo from '../../assets/logos/icon-left-font.svg'
import './Header.css'
import {Link} from 'react-router-dom'


export default function Header() {
  return (
    <div>
        <header className='d-flex justify-content-between align-items-center bg-white mb-5'>
            <Link to='/' className="image-container">
                <img className='logo' src={logo} alt="logo groupomania" />
            </Link>
            <div className='d-flex justify-content-between align-items-center bg-white'>
                <div className="dropdown">
                    <button className="btn btn-primaire dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>                
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
                <Link className='btn btn-primaire h-100 m-3' to='/createpost'>Add a post</Link>
            </div>
        </header>
    </div>
  )
}
