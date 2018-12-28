import React from 'react';
import { NavLink } from 'react-router-dom';
import {HOME_CONST, ABOUT_CONST, CONTACT_CONST} from '../Constants'

const FooterNavBar =() => {
    return (
        <nav className="nav-wrapper hide">
            <div className="container">   
                <ul className="center">
                    <li><NavLink to="/">{HOME_CONST}</NavLink></li>
                    <li><NavLink to="/About">{ABOUT_CONST}</NavLink></li>
                    <li><NavLink to="/Contact">{CONTACT_CONST}</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default FooterNavBar