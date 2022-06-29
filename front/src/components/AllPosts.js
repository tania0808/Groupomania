import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
//import CreatePost from '../pages/post/CreatePost';

import Post from './Post';
export default function AllPosts() {

    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    console.log(currentUser);
    useEffect(() => {
        axios.get("http://localhost:3000/posts", {
          headers: {
            accessToken: localStorage.getItem('accessToken')
          }
      })
        .then((response) =>{
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(response.data.likedPosts.map((like) => { return like.PostId}));
          setCurrentUser(response.data.currentUser);
        });
      }, [])

  return (
    <div className='container d-flex flex-column justify-content-center align-items-center m-auto'>
        {/* <CreatePost/> */}
        {
        listOfPosts.map((post) => {
          return(
            <Post key={post.id} post={post} liked={likedPosts.includes(post.id)} currentUser={currentUser}/>
          )
        })
      }

      </div>
  )
}
