import React from 'react';
import { NavLink } from 'react-router-dom';

const FooterNavBar =() => {
    return (
        <nav className="nav-wrapper">
            <div className="container">   
                <ul className="center">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/About">About</NavLink></li>
                    <li><NavLink to="/Contact">Contact</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default FooterNavBar