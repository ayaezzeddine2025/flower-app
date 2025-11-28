import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar({ currentUser, onLogin, onLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      onLogin(username);
      alert("Login successful!");
      setUsername("");
      setPassword("");
      setIsLoginOpen(false);
    } else {
      alert("Invalid username or password!");
    }
  };

  const handleSignup = () => {
    if (password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.username === username)) {
      alert("Username already exists!");
      return;
    }
    users.push({ username, password, history: [] });
    localStorage.setItem("users", JSON.stringify(users));
    onLogin(username);
    alert("Signup successful!");
    setUsername("");
    setPassword("");
    setIsSignupOpen(false);
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

