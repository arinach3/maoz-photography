import logo from './photos/Maoz-Logo.png';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar.jsx';
import HomePage from './HomePage.jsx';
import About from './components/About.jsx';
import MainPortfolio from './components/MainPortfolio.jsx';
import Footer from "./components/Footer.jsx";
import Promotional from './components/Promotional.jsx';
import Contact from './components/Contact.jsx';
import FamilyPhotos from './components/FamilyPhotos.jsx';
import Events from './components/Events.jsx';
import SignIn from './components/SignIn.jsx';
import { AuthProvider } from "./context/AuthContext";
<html lang="he" dir="rtl"></html>


function App() {
  return (
    <AuthProvider>
      <div dir="rtl">
        
          <Router>
            <NavBar />
            <main class="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/About" element={<About />} />
              <Route path="/MainPortfolio" element={<MainPortfolio />} />
              <Route path="/Promotional" element={<Promotional />} />
              <Route path="/ContactUs" element={<Contact />} />
              <Route path="/Events" element={<Events />} />
              <Route path="/FamilyPhotos" element={<FamilyPhotos />} />
              <Route path="SignIn" element={<SignIn />} />
            </Routes>
            </main>
            <Footer />
          </Router>
        
        
      </div>
    </AuthProvider>
  );
}

export default App;
