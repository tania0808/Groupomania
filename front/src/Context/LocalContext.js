import React, { createContext, useState, useEffect} from 'react';

export const LocalContext = createContext();

/**
 * Context with local storage
 * @param {*} props 
 * @returns 
 */
const LocalContextProvider = props => {

    const [localStorageData, setLocalStorageData] = useState('');

    useEffect(() => {
        setLocalStorageData(localStorage.getItem('accessToken'));
    }, [localStorageData]);

    return (
        <LocalContext.Provider value={{ localStorageData, setLocalStorageData }}>
            { props.children }
        </LocalContext.Provider>
    )
}

export default LocalContextProvider;