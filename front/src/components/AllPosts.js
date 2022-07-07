import  { React, useEffect, useState, useContext } from 'react'
import axios from 'axios';

import CreatePost from './post/CreatePost';
import Post from './Post';

import { LocalContext } from '../Context/LocalContext';

export default function AllPosts() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const { localStorageData } = useContext(LocalContext);
  
  useEffect(() => {
    axios.get("http://localhost:3000/posts", {
      headers: {
        accessToken: localStorageData
      }
    }).then((response) =>{
      setListOfPosts(response.data.listOfPosts);
      setLikedPosts(response.data.likedPosts.map((like) => { return like.PostId}));
      setCurrentUser(JSON.parse(localStorage.getItem('user')));
      });
    }, [])

  return (
      <div className='container d-flex flex-column justify-content-center align-items-center m-auto'>
        <h1 className='align-self-start ms-5 mb-4 ps-3 fs-5 opacity-75 w-50 ms-auto me-auto'>Fil d'actualité</h1>
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
          })
        }
      </div>
  )
}
