import React, { createContext, useState} from 'react';

export const LocalContext = createContext();

const LocalContextProvider = props => {

    const [localStorageData, setLocalStorageData] = useState(localStorage.getItem('accessToken'));

    return (
        <LocalContext.Provider value={{ localStorageData }}>
            { props.children }
        </LocalContext.Provider>
    )
}

export default LocalContextProvider;