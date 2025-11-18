import React from 'react';
import logo from './photos/Maoz-Logo.png';
import photo1 from "./photos/MzV-01672.jpg"
import photo2 from "./photos/MzV-09359.jpg";
import './App.css';
import './HomePage.css';
import { useState, useEffect } from "react";


export default function HomePage(){
  const images = [
    photo1,
    photo2
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return() => clearInterval(interval);  
  }, [images.length]);

    return (
    <div class="home-carousel">

        <img src={images[currentIndex]} class="image-carousel" alt="home carousel" />;
 
    </div>
  );
}