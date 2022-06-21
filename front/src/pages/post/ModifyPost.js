import {React, useState, useEffect} from 'react'
import Header from '../header/Header'
import {useParams} from 'react-router-dom'
import axios from 'axios';

export default function ModifyPost() {
    let { id } = useParams();
    const [post, setPost] = useState();
    console.log(post);

    useEffect(() => {

        axios.get(`http://localhost:3000/posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
        .then((response) => {
            setPost(response.data.dataValues);
        });
    }, [id])
    return (

    <div>
        <Header/>
        <h1>ModifyPost number {id}</h1>
    </div>
  )
}
