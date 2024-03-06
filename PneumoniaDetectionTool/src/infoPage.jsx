import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

const InfoPage = () => {
  const [areaCode, setAreaCode] = useState('');
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => { // Ensures elements are rendered
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // A slight delay can help with timing issues
    }
  }, [location.hash]); // Depend on hash to re-run

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here based on `areaCode`
    console.log('Searching for:', areaCode);
  };


  return (
    <div className='info-page-container'>
      <section id="diagnostic-centers">
        <h2>List of Diagnostic Centers</h2>
        <form onSubmit={handleSearch} style={{margin: '20px 0'}}>
          <input
            type="text"
            placeholder="Enter Area Code"
            value={areaCode}
            onChange={(e) => setAreaCode(e.target.value)}
            style={{marginRight: '10px'}}
          />
          <button type="submit">Search</button>
        </form>
      </section>
      <section id="contact-us">
        <h2>Contact Us</h2>
        {/* Content for Contact Us */}
      </section>
    </div>
  );
};

export default InfoPage;
