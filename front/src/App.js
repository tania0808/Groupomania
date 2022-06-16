import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

import {Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home';
import Post from './pages/post/createPost';
import GetPost from './pages/post/GetPost';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/createpost" element={<Post/>} />
        <Route path="/post/:id" element={<GetPost/>} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/auth/signup" element={<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;
