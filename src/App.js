import logo from './photos/Maoz-Logo.png';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar.jsx';
import HomePage from './HomePage.jsx';
import About from './components/About.jsx';
import MainPortfolio from './components/MainPortfolio.jsx';
import Footer from "./components/Footer.jsx";
<html lang="he" dir="rtl"></html>


function App() {
  return (
    <div dir="rtl">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/promotional" element={<MainPortfolio />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
