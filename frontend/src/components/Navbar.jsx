import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar(){
  return (
    <nav className="navbar">
      <div className="navbar-brand">GlobePay</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/payments">Payments</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}


