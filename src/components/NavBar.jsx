import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar({ currentUser, onLogin, onSignup, onLogout }) {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({ username: "", password: "" });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignupClick = async (e) => {
    e.preventDefault();
    if (signupData.password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }
    setLoading(true);
    try {
      await onSignup(signupData.username, signupData.password);
      setSignupData({ username: "", password: "" });
      setIsSignupOpen(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    }
    setLoading(false);
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onLogin(loginData.username, loginData.password);
      setLoginData({ username: "", password: "" });
      setIsLoginOpen(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
    setLoading(false);
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

      {error && <div className="error-message">{error}</div>}

      {isLoginOpen && !currentUser && (
        <form className="nav-form" onSubmit={handleLoginClick}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      )}

      {isSignupOpen && !currentUser && (
        <form className="nav-form" onSubmit={handleSignupClick}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={signupData.username}
            onChange={handleSignupChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleSignupChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      )}
    </nav>
  );
}

export default NavBar;
