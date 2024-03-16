/*import React, { useState } from 'react';

const TestPage = ({ onGoBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);


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
      .then(async response => {
        const data = await response.text();
        if (!response.ok) {
          // When the server response is not OK, throw an error with the response status
          return response.text().then(text => { throw new Error(text) });
          
        }
        //return response.json();
        return JSON.parse(data);
      })
      //.then(response => response.json())
      .then(data => {
        setPredictionResult(data.prediction_result);
        setError(null);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.toString()); 
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
          <button onClick={handleSubmit} style={{ display: 'block', margin: 'auto' }}>Submit Image</button>
        </div>
      )}
      {predictionResult && (
        <div>
          <p>Prediction: {predictionResult.most_probable_class}</p>
          <p>Probability: {predictionResult.probability}</p>
        </div>
      )}
      {
        error && (
        <div style={{ color: 'red' }}>
        Error: {error}
    </div>
  )
}
      <button onClick={onGoBack} style={{ marginTop: '10px' }}>Go Back</button>
    </div>
  );
};

export default TestPage;
*/

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Upload the X-Ray</h1>
      <input type="file" onChange={handleImageChange} accept="image/*" style={{ marginBottom: '10px', margin: '20px' }}/>
      {selectedImage && (
        <div style={{ textAlign: 'center' }}>
          <img src={URL.createObjectURL(selectedImage)} alt="Preview" style={{ maxWidth: '15%', height: 'auto', marginBottom: '10px' }} />
          <button onClick={handleSubmit} style={{ display: 'block', margin: 'auto' }}>Submit Image</button>
        </div>
      )}
      {predictionResult && (
        <div>
          <p>Prediction: {predictionResult.most_probable_class}</p>
          <p>Probability: {predictionResult.probability}</p>
        </div>
      )}
      <button onClick={onGoBack} style={{ marginTop: '10px' }}>Go Back</button>
    </div>
  );
};

export default TestPage;

