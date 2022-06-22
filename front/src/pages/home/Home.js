import axios from 'axios';
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Home.css'
import Header from '../header/Header';
import { faThumbsUp, faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Home() {

  const [listOfPosts, setListOfPosts] = useState([]);
  const [like, setLike] = useState(false);

  const toggleState = () => {
    setLike(!like)
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
            <div key={value.id}>
              <div onClick={() => {navigate(`/post/${value.id}`)} } className="container d-flex flex-column justify-content-center align-items-center bg-light mb-4">
                <img className='postImage' src={value.imageUrl} alt="post"/>
                <h2>{value.title}</h2>
                <p>{value.postText}</p>
                <p>{value.createdAt.split('T')[0]}</p>
              </div>
                <button className='btn fs-2' onClick={toggleState}>
                  {like ? <FontAwesomeIcon icon={faHeartBroken}/> : <FontAwesomeIcon icon={faHeart}/> }           
                </button>
            </div>
          )
        })
      }

      </div>
    </div>
  )
}
