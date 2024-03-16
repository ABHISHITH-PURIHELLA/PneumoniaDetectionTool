import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { LoginForm, SignUpForm } from './authPages.jsx';
import TestPage from './testpage'; 
import InfoPage from './infoPage.jsx';
import './App.css'; 


const App = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoginForm, setShowLoginModal] = useState(false);
  const [showSignUpForm, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  const handleTakeTestClick = () => {
    navigate('/test'); // This navigates to the TestPage
  };


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    //navigate(`/${page}`);
    setDropdownOpen(false); // Close the dropdown when an item is clicked
  };

  const renderContent = () => {
    if (currentPage === 'test') {
      return <TestPage onGoBack={() => setCurrentPage('home')} />;
    } else {
      // The rest of the home page content
      return (
        <header className="header">
          <h1>A Guide for your well being.</h1>
          
        </header>
      );
    }
  };

  const openSignUpModal = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };


  return (
    
    <div className="home-container">
      <nav className="navigation">       
        <div className="logo">ToolAtYour'Tip</div>
        <div className="menu-container">
          <button className="menu-button" onClick={toggleDropdown}>Menu</button>
          {dropdownOpen && (
            <div className="dropdown">
              
              {/*<button className="dropdown-item" onClick={() => handlePageChange('test')}>Take a Test</button>*/}
              <button className="dropdown-item" onClick={handleTakeTestClick}>Take a Test</button>
              <a href="#instructions" className="dropdown-item">Instructions for Test</a>
              
              <button className="dropdown-item" onClick={() => navigate('/info')}>Info</button>
            </div>
          )}
        </div>
        <div className="auth-buttons">
          {/*<a href="/">Home</a>*/}
          <Link to="/">Home</Link>         
          <button className="login-button" onClick={() => setShowLoginModal(true)}>Log in</button>
          <button className="signup-button" onClick={() => setShowSignupModal(true)}>Sign up</button>
        </div>
      </nav>
      {renderContent()}
      {showLoginForm && <LoginForm onClose={() => setShowLoginModal(false)} onSignUpClick={openSignUpModal} onSuccess={() => setCurrentPage('home')} />}
      {showSignUpForm && <SignUpForm onClose={() => setShowSignupModal(false)} onSuccess={() => setCurrentPage('home')} />}
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



