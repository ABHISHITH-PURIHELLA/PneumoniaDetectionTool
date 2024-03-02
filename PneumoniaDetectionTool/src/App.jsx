import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LoginModal, SignupModal } from './authPages.jsx';
import TestPage from './testpage'; 
import InfoPage from './infoPage.jsx';
import './App.css'; 


const App = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);


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
          <a href="/">Home</a>
          
          <button className="login-button" onClick={() => setShowLoginModal(true)}>Log in</button>
          <button className="signup-button" onClick={() => setShowSignupModal(true)}>Sign up</button>
        </div>
      </nav>
      {renderContent()}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onSuccess={() => setCurrentPage('home')} />}
      {showSignupModal && <SignupModal onClose={() => setShowSignupModal(false)} onSuccess={() => setCurrentPage('home')} />}
      <Routes>
        
        <Route path="/test" element={<TestPage />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
      <footer className="footer-links">
        <Link to="/info#diagnostic-centers">List of Diagnostic Centers</Link>
        <Link to="/info#contact-us">Contact Us</Link>
      </footer>
      
    </div>
    
  );
};

export default App;
