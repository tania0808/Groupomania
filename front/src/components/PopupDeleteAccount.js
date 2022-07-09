import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
export default function PopupDeleteAccount(props) {
  return (
    <div className='popup-box'>
        <div className="popup d-flex flex-column align-items-center rounded-3">
            <button onClick={props.handlePopup} className='btn-close position-absolute top-0 end-0 pt-2 pe-3'></button>
            <h1 className='x-mark mt-2'><FontAwesomeIcon icon={faXmark} className="text-danger " /></h1>
            <h2>Are you sure ?</h2>
            <p>You will not be able to recover your account !</p>
            <div className='mt-3 w-50 d-flex justify-content-around'>
                <button onClick={props.handlePopup} className='btn btn-secondary'>Cancel</button>
                <button onClick={props.deleteAccount} className='btn btn-danger'>Delete !</button>
            </div>

        </div>
    </div>
  )
}
