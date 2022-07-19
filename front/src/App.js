import React from 'react';
import {useState, useEffect} from 'react';
import {Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

import Home from './pages/home/Home';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import ModifyPost from './components/post/ModifyPost';
import NotFound from './pages/notFound/NotFound';
import Profile from './pages/profile/Profile';
import LocalContextProvider from './context/LocalContext';
import UpdateProfile from './components/account/UpdateProfile';
import UpdatePassword from './components/account/UpdatePassword';


function App() {
  const loggedUser = localStorage.getItem('accessToken');
  let navigate = useNavigate();

  useEffect(() => {
    if(!loggedUser) {
      return navigate("/auth/login");
    }
  }, []);

  return (
    <LocalContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/auth/signup" element={<SignUp/>} />
          <Route path="/posts" element={<Home/>} />
          <Route path="/post/update/:id" element={<ModifyPost/>} />
          <Route path='/auth/profile' element={<Profile/>}/>
          <Route path='/auth/profile/update' element={<UpdateProfile/>}/>
          <Route path='/auth/profile/password/update' element={<UpdatePassword/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    </LocalContextProvider>
  );
}

export default App;
