// LoginForm.jsx

import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './authPages.css';
const InputBox = ({ type, name, placeholder, value, icon, onChange }) => (
  <div className="input-box">
    <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required />
    {icon}
  </div>
);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const LoginForm = ({ onClose, onSignUpClick, onSuccess }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ userName: '', userPwd: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Login failed: ' + response.statusText);
      }
      await delay(1000);

      const data = await response.json();
      localStorage.setItem('isLoggedIn', true);
      setLoading(false);
      onSuccess();
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='homePageBody'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <InputBox 
            type="text" 
            name="userName" 
            placeholder="Enter your Email" 
            value={credentials.userName} 
            icon={<FaUser className='icon' />} 
            onChange={handleChange}
          />
          <InputBox 
            type="password" 
            name="userPwd" 
            placeholder="Enter your Password" 
            value={credentials.userPwd} 
            icon={<FaLock className='icon' />} 
            onChange={handleChange}
          />
          {loading ? <p>Loading...</p> : (
            <>
              <div className='buttons-container'>
                <button type="submit" className='login-button'>Login</button>
                <button type="button" className='close-button' onClick={onClose}>Close</button>
              </div>
              <div className='register-link'>
                <p>Don't have an account? <span onClick={onSignUpClick} style={{ cursor: 'pointer', color: 'blue' }}>Register</span></p>
              </div>
            </>
          )}
          {error && <div className='error-message'>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
