import React from 'react';
import { Link } from "react-router-dom";
import "./MainPortfolio.css"


export default function MainPortfolio(){
    return(
        <div class="portfolio-container">
            <Link to="/Promotional" class="portfolio-item">
                <img src="/images/food1.jpg" alt="food" />
                <h3>צילומי תדמית</h3>
            </Link>
            <Link to="/Events" class="portfolio-item">
                <img src="/images/events10.jpg" alt="events" />
                <h3>הופעות ואירועי תרבות</h3>
            </Link>
            <Link to="/FamilyPhotos" class="portfolio-item">
                <img src="/images/family4.jpg" alt="family" />
                <h3>צילומי משפחה ואירועים</h3>
            </Link>
            
        </div>
    )
}