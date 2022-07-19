import { React, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios';

import { LocalContext } from '../../context/LocalContext';
import Header from '../header/Header'

import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
/**
 * Component to update a post
 * @returns {String} HTML form with post details
 */
export default function ModifyPost() {
    let { id } = useParams();
    const { localStorageData } = useContext(LocalContext);

    const [post, setPost] = useState('');
    const [postText, setPostText] = useState('');
    const [image, setImage] = useState(post.imageUrl);
    const [imageURL, setImageURL] = useState();
    
    /**
     * Preview uploaded image
     * @param {Event} event 
     */
    const uploadImageToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files);
            setImage(event.target.files[0]);
            setImageURL(URL.createObjectURL(event.target.files[0]));
        }
    };
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ROOT}/posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
        .then((response) => {
            setPost(response.data.dataValues);
        });
    }, [id])
    
    /**
     * Clear file input when clicking on the cross
     * @param {Event} event
     */
    const clearImage = (e) => {
        e.preventDefault();
        setImage('');
        setImageURL('');
    }

    const formData = new FormData();
    formData.append('postText', postText);
    formData.append('imageUrl', image);
    
    /**
     * Update the post
     * @param {Event} e click on the button Update the post
     */
    const modifyPost = async (e) => {
        e.preventDefault();
        console.log(formData.get('imageUrl'));
        await axios.put(`${process.env.REACT_APP_API_ROOT}/posts/${id}`, formData, {
            headers: {
                accessToken: localStorageData
            }
        })
        .then(() => {
            window.location = "/posts"
        });
    }
    return (
        <>
            <Header/>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <h1 className='fs-3'>Update the post</h1>
                <form action="" method='PUT' className='col-md-6 col-sm-8' encType='multipart/form-data' onSubmit={modifyPost} >
                    <div className="form-group mt-5">
                        <label htmlFor="postText">Share your thoughts</label>
                        <input defaultValue={post.postText}   type='text' className="form-control p-5" id="postText" rows="3" required onChange={(e) => setPostText(e.target.value)}/>
                    </div>
                    {post.imageUrl !== null && imageURL == null ? <img src={post.imageUrl} alt="post image" width={140} className="mt-3"/>
                    : null}
                    {imageURL && <img src={imageURL} alt="post image" width={140} className="mt-3"/>}
                    <div className="form-group imageUpload bg-light d-flex pe-3 mt-3 align-items-center justify-content-between">
                        <label htmlFor="imageUrl" className='inputFileLabel align-items-center p-2 rounded-1 fw-bolder fs-6 d-flex'>
                        <FontAwesomeIcon className='pe-2' icon={faCamera} />Image
                        </label>
                        <input type="file" style={{visibility: 'hidden'}} className="form-control-file" id="imageUrl" onChange={(e) => {uploadImageToClient(e)}} name="imageUrl"/>
                        <FontAwesomeIcon className='p-1 resetImage' icon={faXmark} onClick={clearImage}/><br />
                    </div>
                    <button type='submit' className='btn btn-primaire mt-2 text-white fw-bold'>Update the post</button>
                </form>
            </div>
        </>
  )
}
