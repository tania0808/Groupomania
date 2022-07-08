import React from 'react'
import Password from './Password'
export default function UpdatePassword(props) {
  return (
      <div className='w-100 ps-4 d-flex' >
        <form action="" method='PUT' className='col-md-6 col-sm-8 w-50 flex-start mt-5' encType='multipart/form-data' onSubmit={props.modifyUser}>
            <h1 className='fs-3 fw-bolder opacity-75'>Change your password</h1>
            <Password id={'password'} value={'New Password'}/>
            <Password id={'password-confirm'} value={'Confirm New Password'}/>
            <button type={"submit"} className={"btn btn-primaire mt-3 text-white fw-bold mb-4 w-100"}>Update password</button>
            <button type={"submit"} onClick={props.togglePassword}  className={"btn btn-primaire text-white fw-bold mb-4 w-100"}>Come back</button>
        </form>
        <div className='passwordInfo w-50 ps-5 pe-5 mt-auto mb-4 mx-auto'>
            <h2 className='fs-5'>Password must contain:</h2>
            <ul className="list-group list-group-flush">
                <li className="list-group-item border-0">At least one uppper-case letter (A-Z)</li>
                <li className="list-group-item border-0">At least 1 number(0-9)</li>
                <li className="list-group-item border-0">At least 8 characters</li>
            </ul>
        </div>
      </div>
  )
}
