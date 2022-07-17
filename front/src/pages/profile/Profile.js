import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Header from '../../components/header/Header';
import UserInfo from '../../components/account/UserInfo';

/**
 * Profile page 
 * @returns {String} HTML of profile page
 */
export default function Profile() {
    return (
        <div className='bg-light vh-100'>
            <Header/>
            <div className="container col-12 col-xs-8 col-md-8 col-lg-6 col-xl-4 bg-white d-flex flex-column align-items-center justify-content-center rounded-2 p-0">
                <UserInfo/>
            </div>
        </div>
    )
}
