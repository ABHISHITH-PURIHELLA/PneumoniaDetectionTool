import React, { useState } from 'react';
import TestPage from './testpage'; // Make sure this import matches your file name, and the component name is capitalized
import './App.css'; 

const App = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setDropdownOpen(false); // Close the dropdown when an item is clicked
  };

  const renderContent = () => {
    if (currentPage === 'test') {
      return <TestPage onGoBack={() => setCurrentPage('home')} />;
    } else {
      // The rest of your home page content
      return (
        <header className="header">
          <h1>A Guide for your well being.</h1>
          {/* Other content of your home page */}
        </header>
      );
    }
  };

  return (
    <div className="home-container">
      <nav className="navigation">       
        <div className="logo">ToolAtYour'Tip</div>
        <div className="menu-container">
          <button className="menu-button" onClick={toggleDropdown}>Menu</button>
          {dropdownOpen && (
            <div className="dropdown">
              {/* Update the click handler here */}
              <button className="dropdown-item" onClick={() => handlePageChange('test')}>Take a Test</button>
              <a href="#instructions" className="dropdown-item">Instructions for Test</a>
              <a href="#info" className="dropdown-item">Info</a>
            </div>
          )}
        </div>
        <div className="auth-buttons">
          <button className="login-button">Log in</button>
          <button className="signup-button">Sign up</button>
        </div>
      </nav>
      {renderContent()}
    </div>
  );
};

export default App;
