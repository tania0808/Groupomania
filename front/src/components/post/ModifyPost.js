import { React, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios';

import { LocalContext } from '../../context/LocalContext';
import Header from '../header/Header'

/**
 * Component to update a post
 * @returns {String} HTML form with post details
 */
export default function ModifyPost() {
    let { id } = useParams();
    const { localStorageData } = useContext(LocalContext);

    const [post, setPost] = useState('');
    const [postText, setPostText] = useState('');
    
    const [image, setImage] = useState(undefined);
    const [imageURL, setImageURL] = useState();
    
    const uploadImageToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
            setImageURL(URL.createObjectURL(event.target.files[0]));
        }
    };

    const formData = new FormData();
    formData.append('imageUrl', image);
    formData.append('postText', postText);

    useEffect(() => {
            axios.get(`http://localhost:3000/posts/${id}`, {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            })
            .then((response) => {
                setPost(response.data.dataValues);
            });
    }, [id])

    /**
     * Update the post
     * @param {Event} e click on the button Update the post
     */
    const modifyPost = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3000/posts/${id}`, formData, {
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
                <h1>Modify a post</h1>
                <form action="" method='PUT' className='col-md-6 col-sm-8' encType='multipart/form-data' onSubmit={modifyPost} >
                    <div className="form-group mt-5">
                        <label htmlFor="postText">Share your thoughts</label>
                        <input defaultValue={post.postText}   type='text' className="form-control p-5" id="postText" rows="3" required onChange={(e) => setPostText(e.target.value)}/>
                    </div>
                    {post.imageUrl !== null && image ? <img src={post.imageUrl} alt=" " width={140} className="mt-3"/> 
                    :  <img src={imageURL} alt="" width={140} className="mt-3" />}
                    <div className="form-group mt-5">
                        <label htmlFor="imageUrl">Choose another image</label><br />
                        <input className="form-control" type="file" id="imageUrl" onChange={uploadImageToClient} name="imageUrl"></input>
                    </div>
                    <button type='submit' className='btn btn-primaire mt-5 text-white fw-bold'>Update the post</button>
                </form>
            </div>
        </>
  )
}
