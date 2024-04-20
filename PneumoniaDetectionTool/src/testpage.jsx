

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './infoPage.css';

const TestPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const loadingMessages = [
    'Loading...',
    'Do not foget to take your pills on time! if any...',
    'Stay Hydrated! Summer is Here :B'
  ];
  let messageIndex = 0;

  useEffect(() => {
    if (loading) {
      const intervalId = setInterval(() => {
        const message = loadingMessages[messageIndex];
        const displayMessage = (messageIndex === 1 || messageIndex === 2) ? <strong>{message}</strong> : message;       
        setLoadingMessage(displayMessage);
        messageIndex = (messageIndex + 1) % loadingMessages.length;
      }, 3000);
  
      return () => clearInterval(intervalId);
    }
  }, [loading]);
  const navigate = useNavigate();
  

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (selectedImage) {
      setPredictionResult(null);
      setLoading(true);
      const formData = new FormData();
      formData.append('image_upload', selectedImage);

      fetch('http://localhost:3001/upload', { 
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        setPredictionResult(data.prediction_result);
        
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() =>
    {
      setLoading(false);
      
    });
    }
  };
  
 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Upload the X-Ray</h1>
      <input type="file" onChange={handleImageChange} accept="image/*" style={{ marginBottom: '10px', margin: '20px' }}/>
      {selectedImage && (
        <div style={{ textAlign: 'center' }}>
          <img src={URL.createObjectURL(selectedImage)} alt="Preview" style={{ maxWidth: '15%', height: 'auto', marginBottom: '10px' }} />
          <div className='submit-container'>
          <button onClick={handleSubmit} disabled={loading} style={{ display: 'block', margin: 'auto' }}>Submit Image</button>
          {loading && (<div>
            <div className="loader_testpage"></div>
          <p>{loadingMessage}</p></div>)}
          </div>
        </div>
      )}

      {predictionResult && (
        <div>
          
          <p>Prediction: <strong>{predictionResult.most_probable_class}</strong></p>
          <p>Confidence Level: <strong>{predictionResult.probability}</strong></p>
          
          {((predictionResult.most_probable_class === 'PNEUMONIA')||((predictionResult.most_probable_class === 'NORMAL')&&(parseFloat(predictionResult.probability.replace('%', ''))<80))) && (
            <div>
              <p>Follow the instructions for further guidance:</p>
              <Link to="/instructions">View Instructions</Link> 
            </div>
          )}        
        </div>
      )}
      <button onClick={() => navigate(-1)} style={{ marginTop: '10px' }}>Go Back</button>
    </div>
  );
};

export default TestPage;

