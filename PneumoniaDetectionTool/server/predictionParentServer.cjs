// server/index.js

//const attachDiagnosticsRoutes = require('./diagnosticsServer.cjs');
//const loginSignupReqs = require('./authDBRequests.cjs');
//const cors = require('cors');
//app.use(cors());

const express = require('express');

const fileUpload = require('express-fileupload');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { predictResult, loadSavedModel } = require('./predict.cjs'); 

const app = express();

app.use(express.json());
const UPLOAD_FOLDER = path.join(__dirname, 'static/uploads');
const ALLOWED_EXT = new Set(['png', 'jpg', 'jpeg']);

const predictionServer = (app)=> {
// Middleware to handle file uploads
//app.use(fileUpload());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'tmp/')
}));

// Static files
app.use('/static', express.static(UPLOAD_FOLDER));

// LOAD MODEL ON APP START
//const ML_MODEL = loadSavedModel();

// Helper function to check allowed file types
const allowedFile = (filename) => {
  const ext = path.extname(filename).toLowerCase().slice(1);
  return ALLOWED_EXT.has(ext);
};

// Route to handle image upload and prediction
app.post('/upload', (req, res) => {
  if (!req.files || !req.files.image_upload) {
    return res.status(400).send('Image not uploaded.');
  }

  const file = req.files.image_upload;
  if (!file.name) {
    return res.status(400).send('No selected file.');
  }

  if (allowedFile(file.name)) {
    const filename = uuidv4() + path.extname(file.name);
    const savePath = path.join(UPLOAD_FOLDER, filename).replace(/\\/g, '/');;
    console.log('Saving Image at:', savePath);

    file.mv(savePath, async (err) => {
      if (err) {
        return res.status(500).send(err);
        //console.error('Error saving the file:', err);
        //return res.status(500).send('Error saving the file.');
      }
      // Log the savePath to verify its correctness
    console.log('Saving Image at:', savePath);
    console.log('About to call Python script with savePath:', savePath);

    console.log('Calling Python script for prediction...');
      try {
        const predictionResult = await predictResult(savePath);
        console.log('Prediction result:', predictionResult);
        predictionResult.probability = (predictionResult.probability * 100).toFixed(2) + '%';
        res.json({
          image_path: `/static/uploads/${filename}`,
          filename: filename,
          prediction_result: predictionResult
        });
      } catch (error) {
        console.error('Error calling predictResult:', error);
        res.status(500).send(error.message);
      }
    });
  } else {
    return res.status(400).send('Only png, jpg, jpeg images are allowed!');
  }
});
}

module.exports = predictionServer;

//attachDiagnosticsRoutes(app);
//loginSignupReqs(app);
//app.use(disgnosticServer)
/*
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
