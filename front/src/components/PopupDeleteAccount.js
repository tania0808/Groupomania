import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
export default function PopupDeleteAccount(props) {
  return (
    <div className='popup-box'>
        <div className="popup d-flex flex-column align-items-center rounded-3 col-sm-10 col-md-8 col-lg-6">
            <button onClick={props.handlePopup} className='btn-close position-absolute top-0 end-0 pt-2 pe-3'></button>
            <h1 className='x-mark mt-2'><FontAwesomeIcon icon={faXmark} className="text-danger " /></h1>
            <h2>Are you sure ?</h2>
            <p>You will not be able to recover your account !</p>
            <div className='mt-3  d-flex justify-content-around mb-5'>
                <button onClick={props.handlePopup} className='btn btn-secondary me-4'>Cancel</button>
                <button onClick={props.deleteAccount} className='btn btn-danger'>Delete !</button>
            </div>

        </div>
    </div>
  )
}
