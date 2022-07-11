import React, { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function ShowHidePassword({ name, getPassword }) {
    const [isVisible, setVisible] = useState(false);

    const toggle = () => {
        setVisible(!isVisible);
    };

  return (
    <div className="form-group mt-3 position-relative">
      <label htmlFor={name}>New Password</label>
      <input 
      type={isVisible ? 'text' : 'password'}
      name={name}
      className="form-control col-sm-6" 
      onChange={getPassword}
      id={name}/>
      { !isVisible ? <FontAwesomeIcon icon={faEye}onClick={toggle}
      className="position-absolute top-50 end-0 pe-3"/> 
        : <FontAwesomeIcon icon={faEyeSlash}onClick={toggle}
      className="position-absolute top-50 end-0 pe-3" /> }
    </div>

  )
}
