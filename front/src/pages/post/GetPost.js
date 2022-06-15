import {React, useEffect} from 'react'
import Header from '../header/Header'
import {useParams} from 'react-router-dom'
import axios from 'axios';




export default function GetPost() {
    let {id} = useParams();
    
    useEffect(() => {
        axios.get("http://localhost:3000/posts")
        .then((response) => {});
    }, [])


  return (
    <div>
        <Header/>
        <h1>Get post</h1>
        <h2>Id of the post is {id}</h2>
    </div>
  )
}
