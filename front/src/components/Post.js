import  { React, useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LocalContext } from '../Context/LocalContext';
import PostHeader from './PostHeader';
import PostDropDown from './PostDropDown';

export default function Post(props) {
  const { localStorageData } = useContext(LocalContext);
  const [post, setPost] = useState({ createdAt: '', User: { userName: ''}});
  const { id, UserId, imageUrl, postText, createdAt } = post;
  const [currentUser, setCurrentUser] = useState({})
  const [liked, setLiked] = useState();
  const [likes, setLikes] = useState(props.post.Likes.length);

  useEffect(() => {
    setCurrentUser(props.currentUser);
    setPost(props.post);
    setLiked(props.liked);
  }, []);
    
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
  };
    
  return (
    <div key={id}  className="post-box d-flex flex-column justify-content-center align-items-center mb-4 bg-white">
      <div className={props.currentUser.id === UserId  || props.currentUser.isAdmin ? 'd-flex flex-row justify-content-between align-items-center w-100 p-3' : 'd-flex flex-row justify-content-start w-100 m-3 ps-3'}>
        <div className='d-flex align-items-center'>
          <PostHeader userPosition={currentUser.userPosition} avatar={props.post.User.userImageUrl} userName={props.currentUser.id === UserId ? props.currentUser.userName : post.User.userName}/>
        </div>
        { (props.currentUser.id === UserId || props.currentUser.isAdmin) &&
        <PostDropDown id={id} deletePost={deletePost} /> }
      </div>
      <div className='w-100'>
        {imageUrl && <img className='postImage' src={imageUrl} alt="post"/>}
        <div className="d-flex flex-column">
          <div className="postText mt-3 ms-2 d-flex justify-content-between">
            <p className='ps-2'>{postText}</p>
          </div>
          <div className='d-flex justify-content-between align-items-center px-3'>
            <div className='d-flex align-items-center'>
              <button className='btn fs-3' onClick={() => {likeAPost(id)}}>
                <FontAwesomeIcon icon={faHeart} className={liked ? 'red' : 'black'}/>          
              </button>
              <span>{likes == 0 ? '' : likes}</span>
            </div>
            <span>{createdAt.split('T')[0].split('-').reverse().join('-')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
