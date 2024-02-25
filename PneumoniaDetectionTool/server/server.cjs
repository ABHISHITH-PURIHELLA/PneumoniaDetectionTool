// server/index.js
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { predictResult, loadSavedModel } = require('./predict.cjs'); 

const app = express();
app.use(cors());
const UPLOAD_FOLDER = path.join(__dirname, 'static/uploads');
const ALLOWED_EXT = new Set(['png', 'jpg', 'jpeg']);

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
    const savePath = path.join(UPLOAD_FOLDER, filename);
    console.log('Saving Image at:', savePath);

    file.mv(savePath, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log('Calling Python script for prediction...');
      try {
        const predictionResult = await predictResult(savePath, ML_MODEL);
        console.log('Prediction result:', predictionResult);
        predictionResult.probability = (predictionResult.probability * 100).toFixed(2) + '%';
        res.json({
          image_path: `/static/uploads/${filename}`,
          filename: filename,
          prediction_result: predictionResult
        });
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  } else {
    return res.status(400).send('Only png, jpg, jpeg images are allowed!');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
