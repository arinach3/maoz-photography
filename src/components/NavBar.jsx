import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import logo from '../photos/Maoz-Logo.png';
import './NavBar.css';

export default function NavBar(){
    const {user , logout } = useAuth();
    return(
        <nav class="navigation-bar">
            <div class="nav-links">
                <Link to="/"><button class="nav-link first-button"><img src={logo} className="nav-logo" alt="logo" /></button></Link>
                <Link to="/About"><button class="nav-link">קצת עלי</button></Link>
                <Link to="/MainPortfolio"><button class="nav-link">העבודות שלי</button></Link>
                <Link to="/ContactUs"><button class="nav-link">צור קשר</button></Link>
                {!user && (<Link to="/SignIn"><button class="nav-link sign-in-button">כניסה</button></Link>)}
                {user && (<div class="signed-in">
                    
                    <button onClick={logout} class="nav-link sign-in-button">יציאה</button>
                    <span>הי {user.email.split("@")[0]} !😊</span>
                    </div>)}
            </div>
        </nav>
    )
}