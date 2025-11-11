import logo from './photos/Maoz-Logo.png';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.jsx";
import HomePage from './HomePage.jsx';
import About from './components/About.jsx';
<html lang="he" dir="rtl"></html>


function App() {
  return (
    <div dir="rtl">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
