import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

import {Routes, Route, Link} from 'react-router-dom'
import Home from './pages/home/Home';
import Post from './pages/post/createPost';
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/createpost" element={<Post/>} />
        <Route path="/auth/login" element={<Home/>} />
        <Route path="/auth/signup" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
