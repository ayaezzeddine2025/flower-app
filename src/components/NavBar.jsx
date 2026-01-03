import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar({ currentUser, onLogin, onLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const backendUrl = "https://your-backend.onrender.com"; // replace with your deployed backend URL

  const handleLogin = async () => {
    try {
      const res = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        onLogin(data.user);
        alert("Login successful!");
        setUsername("");
        setPassword("");
        setIsLoginOpen(false);
      } else {
        alert(data.error || "Invalid username or password!");
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  const handleSignup = async () => {
    if (password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        onLogin(username);
        alert("Signup successful!");
        setUsername("");
        setPassword("");
        setIsSignupOpen(false);
      } else {
        alert(data.error || "Signup failed!");
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/pick-flower">Pick Flower</Link>
        <Link to="/timeline">Timeline</Link>
        <Link to="/daily-message">Daily Message</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="nav-right">
        {currentUser ? (
          <>
            <span className="welcome-text">Hello, {currentUser}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsLoginOpen(!isLoginOpen)}>Login</button>
            <button onClick={() => setIsSignupOpen(!isSignupOpen)}>Signup</button>
          </>
        )}
      </div>

      {/* Login Form */}
      {isLoginOpen && !currentUser && (
        <div className="nav-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {/* Signup Form */}
      {isSignupOpen && !currentUser && (
        <div className="nav-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignup}>Signup</button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
