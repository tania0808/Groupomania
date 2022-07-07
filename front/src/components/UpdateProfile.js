import React from 'react'
import Button from './Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function UpdateProfile(props) {
  return (
    <form action="" method='PUT' className='col-md-6 col-sm-10 w-75 flex-start' encType='multipart/form-data' onSubmit={props.modifyUser}>
        {!props.image 
            ? <img src={props.user.userImageUrl} alt="" className="mt-3 rounded-circle" width={100} height={100}/> 
            : <img src={props.imageURL} className="rounded-circle mt-3" alt="user image" width={100} height={100}  style={{objectFit: 'cover'}}/>
        }
        <h1 className='fs-4 mt-4'>{props.user.userName}</h1>
        
        <div className="form-group imageUpload bg-light d-flex pe-3 align-items-center justify-content-between">
            <label htmlFor="userImageUrl" className='inputFileLabel align-items-center p-2 rounded-1 fw-bolder fs-6 d-flex'>
                <FontAwesomeIcon className='pe-2' icon={faCamera} />Image
            </label>
            <input type="file" style={{visibility: 'hidden'}} className="form-control-file" id="userImageUrl" onChange={props.uploadImageToClient} name="userImageUrl"/>
            <FontAwesomeIcon className='p-1 resetImage' icon={faXmark} onClick={props.clearImage}/><br />
        </div>

        <div className="form-group mt-3">
            <label htmlFor="userName">Set new user name</label>
            <input 
            defaultValue={props.user.userName}
            type='text' 
            className="form-control" 
            id="userName" required
            onChange={props.getUserName} />
        </div>
        <div className="form-group mt-3">
            <label htmlFor="email">Set new email</label>
            <input 
            defaultValue={props.user.email}
            type='email' 
            className="form-control" 
            id="email"
            onChange={props.getEmail}/>
        </div>
        <Button type={'submit'} class={"btn btn-primaire mt-3 text-white fw-bold mb-4"} value={"Modify profile"}/>
        <Button onClick={props.toggleProfile} type={'submit'} class={"btn btn-primaire mt-3 ms-3 text-white fw-bold mb-4"} value={"Come back"}/>
    </form>
  )
}
