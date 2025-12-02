import React from 'react';
import { Link } from "react-router-dom";
import "./MainPortfolio.css"


export default function MainPortfolio(){
    return(
        <div class="portfolio-container">
            <Link to="/Promotional" class="portfolio-item">
                <img src="/images/food1.jpg" alt="food" />
                <h2>צילומי תדמית</h2>
            </Link>
            <Link to="/Events" class="portfolio-item">
                <img src="/images/events10.jpg" alt="events" />
                <h2>הופעות ואירועי תרבות</h2>
            </Link>
            <Link to="/FamilyPhotos" class="portfolio-item">
                <img src="/images/family4.jpg" alt="family" />
                <h2>צילומי משפחה ואירועים</h2>
            </Link>
            
        </div>
    )
}