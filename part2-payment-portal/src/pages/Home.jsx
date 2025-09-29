import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../assets/logo.png';

export default function Home(){
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <img src={logo} alt="GlobePay Logo" className="logo" />
        <h1>Welcome to GlobePay</h1>
        <p>Seamless, secure, and fast international payments. Anytime. Anywhere.</p>
        <button className="btn-primary" onClick={() => navigate('/login')}>
          Get Started
        </button>
      </div>
    </div>
  );
}
