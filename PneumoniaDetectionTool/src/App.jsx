
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
//import { LoginForm, SignUpForm } from './authPages.jsx';
import LoginForm from './LoginForm';  // Make sure the path is correct
import InstructionsPage from './instructionsPage.jsx';
import SignUpForm from './SignUpForm';  // Make sure the path is correct
import TestPage from './testpage'; 
import InfoPage from './infoPage.jsx';
import './App.css'; 


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoginForm, setShowLoginModal] = useState(false);
  const [showSignUpForm, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to generate random colors for the gradient
    function updateBackgroundGradient() {
      const hueStart = Math.floor(Math.random() * 360);
      const hueEnd = (hueStart + Math.floor(Math.random() * 180)) % 360;
      const colorStart = `hsl(${hueStart}, 70%, 85%)`;
      const colorEnd = `hsl(${hueEnd}, 70%, 55%)`;

      // Set the new colors as CSS variables
      document.documentElement.style.setProperty('--gradient-start', colorStart);
      document.documentElement.style.setProperty('--gradient-end', colorEnd);
    }

    // Update the background gradient every 10 seconds
    updateBackgroundGradient();
    const intervalId = setInterval(updateBackgroundGradient, 10000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    navigate('/');
  };

  const handleSignUpSuccess = () => {
    setShowSignupModal(false); // This will close the sign-up modal
    //navigate('/login', { state: { fromSignUp: true } });
    setShowLoginModal(true);
  };

  const handleTakeTestClick = () => {
    navigate('/test'); // This navigates to the TestPage
    setDropdownOpen(false);
  };


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    
  };
  const handleDropdownItemClick =() =>{
    setDropdownOpen(false);
  }
  const handleNavigateToInfo = () => {
    navigate('/info');
    handleDropdownItemClick(); // Reuse the logic to close the dropdown
  };

  const handleNavigateToInstructions = () => {
    navigate('/instructions');
    handleDropdownItemClick(); // Reuse the logic to close the dropdown
  };

  const handleBlur = (event) => {
    // Check if the new focused element is not within the dropdown
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setDropdownOpen(false);
    }
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
      <div className="menu-container" onBlur={handleBlur} tabIndex="0">
          <button className="menu-button"  onClick={toggleDropdown} >Menu</button>
          {dropdownOpen && (
            <div className="dropdown">
              
              
              <button className="dropdown-item" onClick={handleTakeTestClick}>Take a Test</button>
              <button className="dropdown-item" onClick={handleNavigateToInstructions}>Instructions for Test</button>
              
              <button className="dropdown-item" onClick={handleNavigateToInfo}>Info</button>
            </div>
          )}
        </div>    
        <div className="logo">ToolAtYour'Tip</div>
        
        <div className="auth-buttons">
          <Link to="/" className='login-button'>Home</Link>
          {!isLoggedIn ? (
            <>
              <button className="login-button" onClick={() => setShowLoginModal(true)}>Log in</button>
              <button className="signup-button" onClick={() => setShowSignupModal(true)}>Sign up</button>
            </>
          ) : (
            <button className="login-button" onClick={handleLogout}>Log out</button>
          )}
        </div>
      </nav>
      {renderContent()}
      {showLoginForm && <LoginForm onClose={() => setShowLoginModal(false)} onSignUpClick={openSignUpModal} onSuccess={handleLoginSuccess} />}
      {showSignUpForm && <SignUpForm onClose={() => setShowSignupModal(false)} onSuccess={handleSignUpSuccess} />}
      <Routes>
        
        <Route path="/test" element={<TestPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path='/instructions' element={<InstructionsPage />} />
        
      </Routes>
      <footer className="footer-links">
        <Link to="/info#diagnostic-centers">List of Diagnostic Centers</Link>
        <Link to="/info#contact-us">Contact Us</Link>
        <Link to= "/instructions">Tool'Tips</Link>
      </footer>
      
    </div>
    
  );
};

export default App;

