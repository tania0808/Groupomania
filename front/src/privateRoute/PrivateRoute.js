import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom';
import { LocalContext } from '../context/LocalContext';


export default function PrivateRoute({children}) {
    const { localStorageData } = useContext(LocalContext);

  return localStorageData ? children : <Navigate to='/auth/login'/>
}
