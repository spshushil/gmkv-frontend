import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png"; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="Yoga Trust Logo" className="logo-img" />
          <h3>GMKV Yoga Trust</h3>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        > 
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/member/register" onClick={() => setMenuOpen(false)}>Join</Link></li>
          <li><Link to="/admin/login" onClick={() => setMenuOpen(false)}>Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
}
