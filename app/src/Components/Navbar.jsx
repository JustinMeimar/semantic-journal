import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <div className="navbar">
        <ul>
          <li><Link to="/" className="navLink">Home</Link></li>
          <li><Link to="/journal" className="navLink">Journal</Link></li>
          <li><Link to="/chat" className="navLink">Chat</Link></li>
        </ul>
      </div>
    );
}

export default Navbar;