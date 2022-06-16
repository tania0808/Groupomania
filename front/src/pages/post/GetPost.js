import {React, useEffect, useState} from 'react'
import Header from '../header/Header'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './Post.css'



export default function GetPost() {
    let { id } = useParams();
    const [post, setPost] = useState({});
    const [date, setDate] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${id}`)
        .then((response) => {
            setPost(response.data)
            setDate(response.data.createdAt.split('T')[0])
        });
    }, [id])


  return (
    <div>
        <Header/>
            <div className="container post-card">
                <div className="card d-flex flex-lg-row flex-sm-column align-items-sm-center align-items-lg-start text-center">
                    <img className='rounded-3 postImage col-lg-4 col-sm-12 card-img-end img-fluid p-1' src={post.imageUrl} alt="" width={700}/>
                    <div className="col-lg-8 col-sm-12 card-body align-items-center">
                        <div className="card-title">
                            <h1>{post.title}</h1>
                        </div>
                        <div className="card-text">
                            <p>{post.postText}</p>
                            <p className=''>Created at : {date}</p>
                        </div>
                        <div className="card-modificators">
                            <button type="button" className="btn btn-success m-4 py-2">Modify</button>
                            <button type="button" className="btn btn-danger py-2">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
