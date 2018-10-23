import React from 'react';
import About from './About';

const FooterNavBar =() => {
    return (
        <nav className="nav-wrapper">
            <div className="container">   
                <ul className="center">
                    <li><a href="/">Home</a></li>
                    <li><a href="/About">About</a></li>
                    <li><a href="/Contact">Contact</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default FooterNavBar