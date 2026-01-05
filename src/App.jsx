import React, { useState } from "react";
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
import axios from "axios";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });
      if (res.data.user) {
        setCurrentUser(res.data.user);
      } else {
        alert(res.data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Server error during login");
    }
  };

  const handleSignup = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:5000/signup", { username, password });
      if (res.data.user) {
        setCurrentUser(res.data.user);
      } else {
        alert(res.data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error during signup");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="app-container">
      <Router>
        <NavBar
          currentUser={currentUser}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onSignup={handleSignup}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home currentUser={currentUser} />} />
            <Route path="/pick-flower" element={currentUser ? <PickFlower currentUser={currentUser} /> : <Navigate to="/" />} />
            <Route path="/timeline" element={currentUser ? <Timeline currentUser={currentUser} /> : <Navigate to="/" />} />
            <Route path="/daily-message" element={currentUser ? <DailyMessage currentUser={currentUser} /> : <Navigate to="/" />} />
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
