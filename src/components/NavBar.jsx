import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from '../photos/Maoz-Logo.png';
import './NavBar.css';

export default function NavBar(){
    return(
        <nav class="navigation-bar">
            <div>
                <Link to="/"><button class="nav-link first-button"><img src={logo} className="nav-logo" alt="logo" /></button></Link>
                <Link to="/About"><button class="nav-link">קצת עלי</button></Link>
                <Link to="/MainPortfolio"><button class="nav-link">העבודות שלי</button></Link>
            </div>
        </nav>
    )
}