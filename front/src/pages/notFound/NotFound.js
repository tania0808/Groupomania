import React from 'react'
import './NotFound.css'
import {Link} from 'react-router-dom'
import Button from '../button/Button'

export default function NotFound() {
  return (
    <div className='box'>
        <span>KEEP</span>
        <span>CALM</span>
        <span className='error'>404</span>
        <span>PAGE NOT</span>
        <span>FOUND</span>
        
            <Link to="/posts">
                <Button value='GO HOME' class='btn btn-light text-red'/>
            </Link>
        
    </div>

  )
}
