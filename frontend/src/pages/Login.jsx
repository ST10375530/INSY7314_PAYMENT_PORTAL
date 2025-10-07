import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { regex } from '../utils/regex'; 
import './Login.css';

export default function Login(){
  const [form,setForm] = useState({ accountNumber:'', password:'' });
  const [error,setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = e => setForm(s => ({...s, [e.target.name]: e.target.value}));

  const submit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsLoading(true);

    console.log('🔐 Login attempt with:', { 
      accountNumber: form.accountNumber, 
      password: form.password 
    });

    // Input Validation using external regex
    if (!regex.accountNumber.test(form.accountNumber)) { 
      setError('Invalid account number format.'); 
      setIsLoading(false);
      return; 
    }
    if (!form.password) { 
      setError('Password required.'); 
      setIsLoading(false);
      return; 
    }

    try {
      const response = await api.post('/users/login', form);
      
      console.log('Login successful:', response.data);
      
      if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', response.data.name); 
      }
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      console.log('Error details:', {
        status: err?.response?.status,
        message: err?.response?.data?.message,
        data: err?.response?.data
      });
      
      setError(err?.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const testWithKnownUser = () => {
    const testData = {
      accountNumber: "9876543210", // Use the exact account number you registered with
      password: "Test123!" // Use the exact password you registered with
    };
    setForm(testData);
    setError('Test data loaded. Click Login.');
  };

  return (
    <div className="form-card">
      <h2>Welcome Back</h2>
      
      {/* Temporary test button */}
      <button 
        type="button" 
        onClick={testWithKnownUser}
        style={{
          padding: '10px', 
          background: '#6b7280', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px', 
          marginBottom: '15px',
          width: '100%'
        }}
      >
        Load Test User Data
      </button>
      
      <form onSubmit={submit}>
        <input 
          name="accountNumber" 
          value={form.accountNumber} 
          onChange={onChange} 
          placeholder="Account Number (10 digits)" 
          required 
        />
        <input 
          type="password" 
          name="password" 
          value={form.password} 
          onChange={onChange} 
          placeholder="Password" 
          required 
        />
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      { error && <p className="error">{error}</p> }

      <div style={{textAlign: 'center', marginTop: '15px'}}>
        No Account? <Link to="/register" style={{color: '#3b82f6', fontWeight: '600', textDecoration: 'none'}}>Register</Link>
      </div>
    </div>
  );
}