import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

import {Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import ModifyPost from './components/post/ModifyPost'
import NotFound from './pages/notFound/NotFound';
import Profile from './pages/profile/Profile';
import LocalContextProvider from './context/LocalContext';
import UpdateProfile from './components/account/UpdateProfile'
import UpdatePassword from './components/account/UpdatePassword';
import PrivateRoute from './privateRoute/PrivateRoute';

function App() {
  return (
      <LocalContextProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/auth/login" element={<Login/>} />
            <Route path="/auth/signup" element={<SignUp/>} />
            <Route path="/posts" element={
              <PrivateRoute>
                <Home/>
              </PrivateRoute>
            } />
            <Route path="/post/update/:id" element={
              <PrivateRoute>
                <ModifyPost/>
              </PrivateRoute>
            } />
            <Route path='/auth/profile' element={
              <PrivateRoute>
                <Profile/>
              </PrivateRoute>
            }/>
            <Route path='/auth/profile/update' element={
              <PrivateRoute>
                <UpdateProfile/>
              </PrivateRoute>
            }/>
            <Route path='/auth/profile/password/update' element={
              <PrivateRoute>
                <UpdatePassword/>
              </PrivateRoute>
            }/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </div>
      </LocalContextProvider>
  );
}

export default App;
