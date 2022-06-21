import axios from 'axios';
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Home.css'
import Header from '../header/Header';

export default function Home() {

  const [listOfPosts, setListOfPosts] = useState([]);
  
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
            <div onClick={() => {navigate(`/post/${value.id}`)} } className="container d-flex flex-column justify-content-center align-items-center" key={value.id}>
              <img className='postImage' src={value.imageUrl} alt="post"/>
              <h2>{value.title}</h2>
              <p>{value.postText}</p>
              <p>{value.createdAt.split('T')[0]}</p>
            </div>
          )
        })
      }

      </div>
    </div>
  )
}
