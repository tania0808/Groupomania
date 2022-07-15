import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Dropdown component with update and delete post buttons
 * @param {Number} props.id
 * @param {Function} props.deletePost
 * @returns HTML of dropdown menu
 */
export default function PostDropDown(props) {
    const { id, deletePost } = props;
    
    return (
        <div className="dropdown">
            <button className="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                    <Link className="dropdown-item"  to={`/post/update/${id}`}>Modify</Link>
                </li>
                <li>
                    <a className="dropdown-item" href="#" onClick={() => deletePost(id)}>Delete</a>
                </li>
            </ul>
        </div> 
    )
}
