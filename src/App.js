import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './Component/Comman/Footer';
import Navbar from './Component/Comman/Navbar';
import About from './Pages/About';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/home';
import CardItems from './Pages/AdSpace';
import VerifyEmail from './Pages/verifyemail'
import Contact from './Pages/Contact';


function App() {
  const [showAbout, setShowAbout] = useState(false);

  return (
   
      <div>
        <Navbar onAboutClick={() => setShowAbout(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About show={showAbout} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path="/verify-email"element={<VerifyEmail/>}/>
          <Route path="/ad-space" element={<CardItems/>}/>
        </Routes>
      
      </div>
    
  );
}

export default App;
