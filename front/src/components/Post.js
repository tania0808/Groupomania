import React from 'react'
import {useNavigate} from 'react-router-dom'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useState, useEffect } from 'react'

export default function Post(props) {
    console.log(props);
    const token = localStorage.getItem('accessToken');
    const [post, setPost] = useState({ createdAt: '' });
    const [liked, setLiked] = useState();
    const [likes, setLikes] = useState(props.post.Likes.length);

    let navigate = useNavigate();

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
            accessToken: localStorage.getItem('accessToken')
          }
        }).then((response) => {
            setLiked(response.data.liked);
            if(!liked) {
                setLikes(likes + 1)
            } else {
                setLikes(likes - 1)
            }
            

        })
      }

  return (
    <div key={post.id}  className="container d-flex flex-column justify-content-center align-items-center bg-light mb-4">
              <div className='d-flex flex-row justify-content-between w-100 mt-4'>
                <p>By tania</p>
                <div className="dropdown">
                  <button className="btn btn-light" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                  </svg>
                  </button>
                  {}
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" href="#" onClick={() => {navigate(`/post/update/${post.id}`)} }>Modify</a></li>
                    <li><a className="dropdown-item" href="#">Delete</a></li>
                  </ul>
                </div> 
              </div>
              <div onClick={() => {navigate(`/post/${post.id}`)} }>
                <img className='postImage' src={post.imageUrl} alt="post"/>
                <h2>{post.title}</h2>
                <p>{post.postText}</p>
                <p>{post.createdAt.split('T')[0]}</p>
                <p>By {post.userName}</p>
              </div>
                <button className='btn fs-2' onClick={() => {likeAPost(post.id)}}>
                  <FontAwesomeIcon icon={faHeart} className={liked ? 'red' : 'black'}/>          
                </button>
                {/* <p>{post.Likes.length}</p> */}
                <p>{likes}</p>
            </div>
  )
}
