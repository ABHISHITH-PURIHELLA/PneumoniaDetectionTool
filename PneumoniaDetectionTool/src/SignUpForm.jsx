// SignUpForm.jsx

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

const SignUpForm = ({ onClose, onSuccess }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    userPwd: '',
    userEmail: '',
    userCity: '',
    userPhone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        const errorData = await response.text(); // Use .text() initially
        try {
          const jsonError = JSON.parse(errorData); // Then try to parse it as JSON
          throw new Error(`Signup failed: ${jsonError.message}`);
        } catch (jsonParseError) {
          throw new Error(`Signup failed: ${errorData}`);
        }
      }
      setSuccessMessage('User created successfully!');
      await delay(2000);
      const data = await response.json();
      onSuccess();
      navigate('/login', { state: { fromSignUp: true } });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='signUpPageBody'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>SignUp</h1>
          <InputBox
            type="text"
            name="userName"
            placeholder="Enter your name"
            value={user.userName}
            icon={<FaUser className='icon' />}
            onChange={handleChange}
          />
          <InputBox
            type="email"
            name="userEmail"
            placeholder="Enter your email"
            value={user.userEmail}
            icon={<FaUser className='icon' />}
            onChange={handleChange}
          />
          <InputBox
            type="password"
            name="userPwd"
            placeholder="Enter your password"
            value={user.userPwd}
            icon={<FaLock className='icon' />}
            onChange={handleChange}
          />
          <InputBox
            type="text"
            name="userCity"
            placeholder="Enter your city"
            value={user.userCity}
            icon={<FaUser className='icon' />} // Replace with city icon if you have
            onChange={handleChange}
          />
          <InputBox
            type="tel"
            name="userPhone"
            placeholder="Enter your phone"
            value={user.userPhone}
            icon={<FaUser className='icon' />} // Replace with phone icon if you have
            onChange={handleChange}
          />
          {successMessage && <div className='success-message'>{successMessage}</div>}
          {loading ? <p>Loading...</p> : (
            <div className='buttons-container'>
              <button type="submit" className='login-button'>SignUp</button>
              <button type="button" className='close-button' onClick={onClose}>Close</button>
            </div>
          )}
          {error && <div className='error-message'>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
