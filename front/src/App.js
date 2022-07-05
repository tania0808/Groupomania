import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/home/Home';
import Post from './pages/post/CreatePost';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import ModifyPost from './pages/post/ModifyPost';
import NotFound from './pages/notFound/NotFound';
import Profile from './pages/profile/Profile';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/posts" element={<Home/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/post/create" element={<Post/>} />
        <Route path="/post/update/:id" element={<ModifyPost/>} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/auth/signup" element={<SignUp/>} />
        {/* /redirect ne sert à rien */}
        <Route path='/redirect' element={<Navigate to="/auth/login"/>}/>
        <Route path='/auth/profile' element={<Profile/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
