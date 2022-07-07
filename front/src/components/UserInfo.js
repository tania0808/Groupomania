import React from 'react'
import Button from './Button'
export default function UserInfo(props) {
  return (
    <div className='w-100'>
        <div className='d-flex flex-column align-items-center bg-profil rounded-top'>
            <img src={props.user.userImageUrl} className="avatar rounded-circle mt-3" alt="user image" width={100} height={100} style={{objectFit: 'cover'}} />
        </div>
            <h1 className='d-block fs-4 mt-4 text-center mt-5 pt-3 opacity-75'>{props.user.userName}</h1>
        <div className="info-user flex-start w-75 mt-5 ms-5 mb-5">
            <span className='fs-6'>Email</span>
            <p className='opacity-75 mt-1'>{props.user.email}</p>
            <div className='d-flex flex-column w-100 justify-content-start align-items-start'>
                <Button onClick={props.toggleProfile} class={"btn btn-primaire text-center py-3 d-flex align-items-center justify-content-center flex-center fs-6"} value={"Update profil"}/>
                <Button onClick={() => alert('Change password')} class={"btn btn-primaire text-center d-flex mt-2"} value={"Change password"}/>
            </div>
        </div>
    </div>
  )
}
