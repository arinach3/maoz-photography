import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../photos/Maoz-Logo.png';
import { PHOTOGRAPHER_UID } from '../auth/authConfig';
import './NavBar.css';

export default function NavBar(){
    const {user , logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false); 

    return(
        <nav class="navigation-bar">
            <div class="nav-container">
                <Link to="/" onClick={closeMenu}><button class="nav-link first-button"><img src={logo} className="nav-logo" alt="logo" /></button></Link>
                {/* Hamburger menu for mobile */}
                <button class="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">☰</button>
                    <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <Link to="/About" onClick={closeMenu}><button class="nav-link">קצת עלי</button></Link>
                    <Link to="/MainPortfolio" onClick={closeMenu}><button class="nav-link">העבודות שלי</button></Link>
                    <Link to="/ContactUs" onClick={closeMenu}><button class="nav-link">צור קשר</button></Link>
                    {user && user.uid !== PHOTOGRAPHER_UID && (<Link to="/my-gallery" onClick={closeMenu}><button className="nav-link">הגלריה שלי</button></Link>)}
                    {!user && (<Link to="/SignIn" onClick={closeMenu}><button class="nav-link sign-in-button">כניסה</button></Link>)}
                    {user && (<div class="signed-in"><Link to="/SignIn"><button onClick={logout} class="nav-link sign-in-button">יציאה</button></Link>
                    {user?.uid === PHOTOGRAPHER_UID && (<Link to="/Photographer" onClick={closeMenu}><button class="nav-link">העלאת תמונות</button></Link>)}    
                    {user?.uid === PHOTOGRAPHER_UID && (<Link to="/Photographer/Galleries" onClick={closeMenu}><button class="nav-link">ניהול לקוחות</button></Link>)}   
                    </div>)}
                </div>
            </div>
        </nav>
    )
}