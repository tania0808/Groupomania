import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark, faSquareCheck } from "@fortawesome/free-solid-svg-icons";

/**
 * Component with password strength validation on sign up page
 * @param {Object} checks
 * @param {Boolean} capsLetterFlag, numberFlag, pwdLengthFlag, specialCharFlag
 * @returns HTML points of password strength to check
 */
export default function PasswordValidator({ checks, capsLetterFlag, numberFlag, pwdLengthFlag, specialCharFlag}) {
  return (
    <>
        <div className={`d-flex align-items-center ${!checks.capsLetterCheck ? 'red' : 'grey'} `}>
            { !capsLetterFlag ? <FontAwesomeIcon icon={faSquareXmark}/> : <FontAwesomeIcon icon={faSquareCheck} /> }
            <span className='ms-2'>Must be 1 capital letter</span>
        </div>
        <div className={`d-flex align-items-center ${!checks.numberCheck ? 'red' : 'grey'} `}>
            { !numberFlag ? <FontAwesomeIcon icon={faSquareXmark}/> : <FontAwesomeIcon icon={faSquareCheck} /> }
            <span className='ms-2'>Must have a number</span>
        </div>
        <div className={`d-flex align-items-center ${!checks.pwdLengthCheck ? 'red' : 'grey'} `}>
            { !pwdLengthFlag ? <FontAwesomeIcon icon={faSquareXmark}/> : <FontAwesomeIcon icon={faSquareCheck} /> }
            <span className='ms-2'>Must have be over 8 characters long</span>
        </div>
        <div className={`d-flex align-items-center mb-3 ${!checks.specialCharCheck ? 'red' : 'grey'} `}>
            { !specialCharFlag ? <FontAwesomeIcon icon={faSquareXmark}/> : <FontAwesomeIcon icon={faSquareCheck} /> }
            <span className='ms-2'>Must have 1 special character</span>
        </div>
    </>
  )
}
