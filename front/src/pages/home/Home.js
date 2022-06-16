import axios from 'axios';
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

import Header from '../header/Header';

export default function Home() {

  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/posts")
    .then((response) => setListOfPosts(response.data));
  }, [])

  return (
    <div className='container d-flex flex-column justify-content-center m-auto'>
      <Header/>
        {
        listOfPosts.map((value, key) => {
          return(
            <div onClick={() => {navigate(`/post/${value.id}`)} } className="container d-flex flex-column justify-content-center align-items-center" key={value.id}>
              <img src={value.imageUrl} alt="post" width={400}/>
              <h2>{value.title}</h2>
              <p>{value.postText}</p>
              <p>{value.createdAt.split('T')[0]}</p>
            </div>
          )
        })
      }
    </div>
  )
}
