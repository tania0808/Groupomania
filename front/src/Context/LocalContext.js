import React, { createContext, useState} from 'react';

export const LocalContext = createContext();

const LocalContextProvider = props => {

    const [localStorageData, setLocalStorageData] = useState(localStorage.getItem('accessToken'));
    const [localStorageUser, setLocalStorageUser] = useState(JSON.parse(localStorage.getItem('user')));

    return (
        <LocalContext.Provider value={{ localStorageData, localStorageUser }}>
            { props.children }
        </LocalContext.Provider>
    )
}

export default LocalContextProvider;