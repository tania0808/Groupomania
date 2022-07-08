import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className='box vh-100 wv-100 d-flex flex-column align-items-center justify-content-center color-red'>
      <span>KEEP</span>
      <span>CALM</span>
      <span className='error'>404</span>
      <span>PAGE NOT</span>
      <span>FOUND</span>
      <Link to="/posts">
        <button className={"btn btn-primaire text-red"}>GO HOME</button>
      </Link>
    </div>
  )
}
