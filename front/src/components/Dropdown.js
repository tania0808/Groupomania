import {React} from 'react';

import { useNavigate, Link } from 'react-router-dom';

/**
 * Component which includes profile dropdown menu
 * @returns profile dropdown with profile and logout links
 */
export default function Dropdown() {
    let navigate = useNavigate();

    function logOut() {
        localStorage.removeItem('accessToken');
        navigate('/auth/login', { replace: true });
    }

    return (
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
                <Link className='dropdown-item' to={'/auth/profile'}>Profile</Link>
            </li>
            <li>
                <button onClick={() => logOut()} type='button' className="dropdown-item">Log out</button>
            </li>
        </ul>
    )
}
