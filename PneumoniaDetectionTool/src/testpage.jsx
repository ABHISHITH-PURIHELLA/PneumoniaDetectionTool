// TestPage.jsx
import React, { useState } from 'react';

const TestPage = ({ onGoBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image_upload', selectedImage);

      fetch('http://localhost:3001/upload', { // Update this URL to your Flask server's URL
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        setPredictionResult(data.prediction_result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };

  return (
    <div>
      <h1>Take a Test</h1>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {selectedImage && (
        <div>
          <img src={URL.createObjectURL(selectedImage)} alt="Preview" />
          <button onClick={handleSubmit}>Submit Image</button>
        </div>
      )}
      {predictionResult && (
        <div>
          <p>Prediction: {predictionResult.class_name}</p>
          <p>Probability: {predictionResult.probability}%</p>
        </div>
      )}
      <button onClick={onGoBack}>Go Back</button>
    </div>
  );
};

export default TestPage;
