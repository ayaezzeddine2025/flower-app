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
import axios from "axios"; // new import

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // optional: check if user is logged in from backend on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/currentUser", {
          withCredentials: true, // if using sessions/cookies
        });
        if (res.data.username) {
          setCurrentUser(res.data.username);
        }
      } catch (err) {
        console.log("No active user session");
      }
    };
    checkUser();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password }, { withCredentials: true });
      if (res.data.success) {
        setCurrentUser(res.data.username);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      setCurrentUser(null);
    } catch (err) {
      console.error(err);
    }
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