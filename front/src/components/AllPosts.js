import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';

import Post from './Post';
export default function AllPosts() {

    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/posts", {
          headers: {
            accessToken: localStorage.getItem('accessToken')
          }
      })
        .then((response) =>{
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(response.data.likedPosts.map((like) => { return like.PostId}));
        });
      }, [])

  return (
    <div className='container d-flex flex-column justify-content-center m-auto'>
        {
        listOfPosts.map((post) => {
          return(
            <Post key={post.id} post={post} liked={likedPosts.includes(post.id)}/>
          )
        })
      }

      </div>
  )
}
