import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

const InfoPage = () => {
  const [areaCode, setAreaCode] = useState('');
  const [clinics,setClinics] = useState([]);
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

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/search-clinics', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ areaCode })
      });
      let data = await response.json();
      if (data.length > 10) {
        data = data.filter(clinic => {
          const hasMandatoryFields = clinic.street && clinic.postcode && clinic.city;
          const hasAtLeastOneContactField = clinic.email || clinic.phone || clinic.website;
          return hasMandatoryFields && hasAtLeastOneContactField;
        });
        data = data.slice(0,10);
      }
      setClinics(data);
      console.log('Clinics found:', data);
  } catch (error) {
      console.error('Error fetching clinics:', error);
  }
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
        
        {clinics.length > 0 ? (
          clinics.map((clinic, index) => (
            <div key={index}>
              <h3>{clinic.name ?? 'Not available'}</h3>
              <p>{clinic.houseNumber ?? ''} {clinic.street ?? ''}, {clinic.city ?? ''}, {clinic.state}, {clinic.postcode ?? ''}</p>
              <p>Email: {clinic.email ?? 'Not available'}</p>
              <p>Phone: {clinic.phone ?? 'Not available'}</p>
              <p>Website: {clinic.website ? <a href={clinic.website} target="_blank" rel="noopener noreferrer">{clinic.website}</a> : 'Not available'}</p>
              <p>Opening Hours: {clinic.openingHours ?? 'Not available'}</p>
            </div>
          ))
        ) : (
          <p>No clinics found for the given area code.</p>
        )}
      

      </section>
      <section id="contact-us">
        <h2>Contact Us</h2>
        {/* Content for Contact Us */}
      </section>
    </div>
  );
};

export default InfoPage;
