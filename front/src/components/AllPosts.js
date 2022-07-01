import  { React, useEffect, useState } from 'react'
import axios from 'axios';

import CreatePost from '../pages/post/CreatePost';
import Post from './Post';

export default function AllPosts() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [userName, setUsername] = useState('');

  useEffect(() => {
    axios.get("http://localhost:3000/posts", {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) =>{
      setListOfPosts(response.data.listOfPosts);
      setLikedPosts(response.data.likedPosts.map((like) => { return like.PostId}));
      setCurrentUser(response.data.currentUser);
      setUsername(response.data.userName);
      });
    }, [])

  return (
    <div className='container d-flex flex-column justify-content-center align-items-center m-auto'>
      <h1 className='align-self-start ms-5 mb-4 ps-3 fs-5 opacity-75 w-50 ms-auto me-auto'>Fil d'actualité</h1>
      <CreatePost postListChanger={setListOfPosts} userName={userName}/>
      { listOfPosts.map((post) => {
          return(
            <Post 
            key={post.id} 
            postListChanger={setListOfPosts} 
            post={post} 
            liked={likedPosts.includes(post.id)} 
            currentUser={currentUser}/>
          )
        })
      }
    </div>
  )
}
