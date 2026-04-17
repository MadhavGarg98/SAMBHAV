import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1 className="navbar-title">Sambhav AI</h1>
          <span className="navbar-subtitle">AI-powered document intelligence</span>
        </div>
        <div className="navbar-info">
          Document Q&A System
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
