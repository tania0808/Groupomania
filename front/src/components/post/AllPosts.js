import  { React, useEffect, useState } from 'react'
import axios from 'axios';

import CreatePost from './CreatePost';
import Post from './Post';

/**
 * Component to display all the posts
 * @returns {String} HTML of the posts
 */
export default function AllPosts() {
  
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ROOT}/posts`, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) =>{
        setListOfPosts(response.data.listOfPosts);
        setLikedPosts(response.data.likedPosts.map((like) => { return like.PostId}));
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
      });
    }, []);

  return (
    <div className='post-container d-flex flex-column align-items-center m-auto col-10 col-xs-8 col-md-8 col-lg-6 col-xl-4'>
      <h1 className='align-self-start ms-5 mb-4 ps-3 fs-5 opacity-75 w-50 me-auto'>Fil d'actualité</h1>
      <CreatePost postListChanger={setListOfPosts} currentUser={currentUser}/>
      { listOfPosts.reverse().map((post) => {
        return(
          <Post 
          key={post.id} 
          postListChanger={setListOfPosts} 
          post={post} 
          liked={likedPosts.includes(post.id)} 
          currentUser={currentUser}/>
        )
      })}
    </div>
  )
}
