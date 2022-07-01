import React from 'react';
import Header from '../header/Header';
import { useState, useEffect } from 'react'
import axios from 'axios';


export default function Profile() {

    const [user, setUser] = useState({});

    useEffect(() => {
        async function getUser() {
            axios.get(`http://localhost:3000/auth/profile`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
            })
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
            });
        }

        getUser();

    }, [])

    return (
        <div>
            <Header/>
            <div className="container bg-light d-flex align-items-center justify-content-center">
                <img src={user.userImageUrl} alt="" width={100} />

            </div>
        </div>
    )
}
