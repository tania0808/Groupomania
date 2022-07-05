import  { React, useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LocalContext } from '../Context/LocalContext';
import PostHeader from './PostHeader';
import './Post.css'


export default function Post(props) {
  const { localStorageData } = useContext(LocalContext);

  const [post, setPost] = useState({ createdAt: '', User: { userName: '' }});
  const [liked, setLiked] = useState();
  const [likes, setLikes] = useState(props.post.Likes.length);

  useEffect(() => {
      setPost(props.post);
      setLiked(props.liked);
  }, [])

  async function likeAPost (postId) {
    await axios.post("http://localhost:3000/like", {
      id: postId
    },
    {
      headers: {
        accessToken: localStorageData
      }
    })
    .then((response) => {
        setLiked(response.data.liked);
        if(!liked) {
            setLikes(likes + 1)
        } else {
            setLikes(likes - 1)
        }
    })
  };

  async function deletePost(postId) {
    await axios.delete(`http://localhost:3000/posts/${postId}`,
    {
      headers: {
        accessToken: localStorageData
      }
    })
    .then((response) => {
      props.postListChanger(response.data.posts);
    })
  }

  return (
    <div key={post.id}  className="post-box d-flex flex-column justify-content-center align-items-center mb-4 bg-white">
      <div className={props.currentUser.id === post.UserId  || props.currentUser.isAdmin ? 'd-flex flex-row justify-content-between align-items-center w-100 p-3' : 'd-flex flex-row justify-content-start w-100 m-3 ps-3'}>
        <div className='d-flex align-items-center'>
          <img className='userImage' src="https://annu-recherche.inspe-lille-hdf.fr/img/avatar_defaut.png" alt="" />
          <PostHeader userName={post.User.userName}/>
        </div>
        {(props.currentUser.id === post.UserId || props.currentUser.isAdmin) &&
            <div className="dropdown">
            <button className="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                <Link className="dropdown-item"  to={`/post/update/${post.id}`}>
                  Modify
                </Link>
                </li>
                <li><a className="dropdown-item" href="#" onClick={() => deletePost(post.id)}>Delete</a></li>
            </ul>
            </div> 
        }
      </div>
      <div className='w-100'>
        {post.imageUrl && <img className='postImage' src={post.imageUrl} alt="post"/>}
        <div className="d-flex flex-column">
          <div className="postText mt-3 ms-2 d-flex justify-content-between">
            <p className='ps-2'>{post.postText}</p>
          </div>
          <div className='d-flex justify-content-between align-items-center px-3'>
            <div className='d-flex align-items-center'>
              <button className='btn fs-3' onClick={() => {likeAPost(post.id)}}>
                <FontAwesomeIcon icon={faHeart} className={liked ? 'red' : 'black'}/>          
              </button>
              <span>{likes == 0 ? '' : likes}</span>
            </div>
            <span>{post.createdAt.split('T')[0].split('-').reverse().join('-')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
