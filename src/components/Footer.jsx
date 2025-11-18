import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Footer(){
    return(
        <div class="footer">
            
            <div class="social-icons">
                <a href="https://www.facebook.com/MaozPhoto" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="icon" />
                </a>

                <a href="https://www.instagram.com/maozvay" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="icon" />
                </a>
                <div className="contact-item">
                    
                    <p>maoz.vay@gmail.com</p>
                    <FaEnvelope size={22} className="icon" />
                </div>
                <div className="contact-item">
                    
                    <p>054-4351537</p>
                    <FaPhone size={20} className="icon" />
                </div>

                
            </div>
            
        </div>
    )
}