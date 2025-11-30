import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import PickFlower from "./pages/PickFlower";
import Timeline from "./pages/Timeline";
import DailyMessage from "./pages/DailyMessage";
import About from "./pages/About";
import Contact from "./pages/Contact";

import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser") || null);

  // Sync currentUser with localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", currentUser);
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="app-container">
      <Router>
        <NavBar currentUser={currentUser} onLogin={handleLogin} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pick-flower" element={currentUser ? <PickFlower /> : <Navigate to="/" />} />
            <Route path="/timeline" element={currentUser ? <Timeline /> : <Navigate to="/" />} />
            <Route path="/daily-message" element={currentUser ? <DailyMessage /> : <Navigate to="/" />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
