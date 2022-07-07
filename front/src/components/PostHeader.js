import React from 'react'

export default function PostHeader(props) {
  return (
    <div className="userInfo d-flex">
        <img className='userImage' src={props.avatar} alt="" />
        <div className='ms-3'>
          <p className='fw-bold'>{props.userName}</p>
          <span className='fw-light'>Junior React Developper</span>
        </div>
    </div>
  )
}
