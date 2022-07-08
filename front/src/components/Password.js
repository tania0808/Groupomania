import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function Password(props) {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }
  return (
    <div className="form-group mt-3 position-relative">
        <label htmlFor={props.id}>{props.value}</label>
        <input 
        type={passwordShown ? 'text' : 'password'} 
        className="form-control col-sm-6" 
        id={props.id}/>
        <FontAwesomeIcon icon={faEye} 
        className="position-absolute top-50 end-0 pe-3" 
        onClick={props.togglePassword}/>
    </div>
  )
}
