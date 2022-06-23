import axios from 'axios';
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Home.css'
import Header from '../header/Header';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Home() {

  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  
  async function likeAPost (postId) {
    await axios.post("http://localhost:3000/like", {
      id: postId
    },
    {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) => {
      setListOfPosts(listOfPosts.map((post) => {

        if(post.id === postId) {
          if(response.data.liked){
            return {...post,
              Likes: [...post.Likes, 0]}
          } else {
            const likeArray = [...post.Likes];
            likeArray.pop()
            return {...post,
              Likes: likeArray}
          }
        } else {
          return post
        }
      }));

      if(!likedPosts.includes(postId)){
        setLikedPosts([...likedPosts, postId])
      } else {
        const newArray = likedPosts.filter((id) => {
          return id !== postId
        });
        setLikedPosts(newArray)
      }
    })
  }

  let navigate = useNavigate();
  
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
    <div>
      <Header/>
      <div className='container d-flex flex-column justify-content-center m-auto'>
        {
        listOfPosts.map((value, key) => {
          return(
            <div key={value.id}  className="container d-flex flex-column justify-content-center align-items-center bg-light mb-4">
              <div onClick={() => {navigate(`/post/${value.id}`)} }>
                <img className='postImage' src={value.imageUrl} alt="post"/>
                <h2>{value.title}</h2>
                <p>{value.postText}</p>
                <p>{value.createdAt.split('T')[0]}</p>
              </div>
                <button className='btn fs-2' onClick={() => {likeAPost(value.id)}}>
                  <FontAwesomeIcon icon={faHeart} className={likedPosts.includes(value.id) ? 'red' : "black"}/>          
                </button>
                <p>{value.Likes.length}</p>
            </div>
          )
        })
      }

      </div>
    </div>
  )
}
