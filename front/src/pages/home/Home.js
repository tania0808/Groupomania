import axios from 'axios';
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Home.css'
import Header from '../header/Header';
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Home() {

  const [listOfPosts, setListOfPosts] = useState([]);
  const [like, setLike] = useState(false);

  const toggleState = () => {
    setLike(!like)
  }

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
        console.log(response.data.liked);
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
      }))
    })
  }

  let navigate = useNavigate();
  
  useEffect(() => {
    axios.get("http://localhost:3000/posts", {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
  })
    .then((response) => setListOfPosts(response.data));
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
                <button className='btn fs-2' onClick={() => likeAPost(value.id)}>
                  {like ? <FontAwesomeIcon icon={faHeartBroken}/> : <FontAwesomeIcon icon={faHeart}/> }           
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
