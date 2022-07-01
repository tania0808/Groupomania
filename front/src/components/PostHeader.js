import React from 'react'

export default function PostHeader(props) {
  return (
    <div className="userInfo ms-3">
        <p className='fw-bold'>{props.userName}</p>
        <span className='fw-light'>Junior React Developper</span>
    </div>
  )
}
