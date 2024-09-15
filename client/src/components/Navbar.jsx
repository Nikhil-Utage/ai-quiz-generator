// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">QuizMate</h1>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">Login</Link>
          </li>
          <li className="navbar-item">
            <Link to="/signup" className="navbar-link">Signup</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
