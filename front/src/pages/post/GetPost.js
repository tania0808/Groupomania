import {React, useEffect, useState} from 'react'
import Header from '../header/Header'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './Post.css'
import PostCard from '../postCard/PostCard';



export default function GetPost() {
    let { id } = useParams();
    const [post, setPost] = useState({});
    const [date, setDate] = useState();
    const [user, setUser] = useState();

    useEffect(() => {

        axios.get(`http://localhost:3000/posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
        .then((response) => {
            setPost(response.data.dataValues)
            setDate(response.data.dataValues.createdAt.split('T')[0]);
            setUser(response.data.isOwnPost)
        });
    }, [id])

    return (
        <div>
            <Header/>
            <PostCard post={post} date={date} user={user}/>
        </div>
    )
}
