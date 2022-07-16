import React from 'react'

/**
 * Component with user information on the top of the post
 * @param {String} props.avatar
 * @param {String} props.userName
 * @param {String} props.userPosition
 * @returns HTML of post header with user information
 */
export default function PostHeader({avatar, userName, userPosition}) {
  return (
    <div className="userInfo d-flex">
        <img className='userImage' src={avatar} alt="user avatar" />
        <div className='ms-3'>
          <p className='fw-bold'>{userName}</p>
          <span className='fw-light'>{userPosition}</span>
        </div>
    </div>
  )
}
