import React from 'react';
import './About.css';

export default function About(){
    return(
        <div>
            <h1>אודות</h1>
            <div class="about-container">
                <div class="about-text">
                    <p>שלום, אני מעוז,</p>
                    <p>צלם סטילס של אירועי תרבות, אירועים משפחתיים קטנים, בוקים, צילומי משפחה והיריון ועוד.</p>
                    <p>אני אוהב להיות זבוב על הקיר, לתפוס את הרגעים הקטנים והמיוחדים, בשקט בשקט, בלי שתשימו לב בכלל.</p>
                </div>
                <div class="about-photo">
                    <img src="/images/maoz.jpg" alt="family" />
                </div>
                
            </div>
        </div>
    )

}