const { predictResult } = require('./predict.cjs');

const imagePath = 'C:/Users/purih/OneDrive/Desktop/Project_597/PneumoniaDetectionTool/PneumoniaDetectionTool/server/static/uploads/8438cb87-d317-4c0c-a339-094f7ce3dc77.jpeg'; // Update this path

predictResult(imagePath)
  .then(result => {
    console.log('Prediction result:', result);
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
