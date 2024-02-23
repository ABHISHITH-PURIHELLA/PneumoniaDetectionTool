// predict.js
const tf = require('@tensorflow/tfjs-node'); // or '@tensorflow/tfjs' for GPU support
const fs = require('fs');
const jpeg = require('jpeg-js');

const loadSavedModel = async (modelPath = 'resnet152v2_feature_extraction_final_best_model') => {
  console.log('Loading Model at:', modelPath);
  const model = await tf.loadLayersModel(`file://${modelPath}/model.json`);
  console.log('Model Loaded Successfully');
  return model;
};

const readAndPreprocessImage = (imagePath) => {
  console.log('Reading Image from:', imagePath);
  const imageBuffer = fs.readFileSync(imagePath);
  const imageData = jpeg.decode(imageBuffer, true);
  console.log('Image Loaded Successfully');

  if (imageData.width * imageData.height * 3 !== imageData.data.length) {
    throw new Error('Uploaded Image is grayscale(has only 2 color channels) and cannot be processed!');
  }

  const numChannels = 3;
  const imageTensor = tf.node.decodeImage(imageBuffer, numChannels).resizeNearestNeighbor([224, 224]).toFloat().div(tf.scalar(255)).expandDims();
  console.log('Resized Image Shape:', imageTensor.shape);
  return imageTensor;
};

const predictResult = async (imgPath, model = null) => {
  if (!model) {
    model = await loadSavedModel();
  }

  const imageTensor = readAndPreprocessImage(imgPath);
  const prediction = model.predict(imageTensor);
  const predicted_proba = await prediction.dataSync()[0];
  let predicted_class = "NORMAL";
  if (predicted_proba > 0.5) {
    predicted_class = "PNEUMONIA";
  } else {
    predicted_proba = 1 - predicted_proba;
  }

  const return_dict = {
    'probability': predicted_proba,
    'most_probable_class': predicted_class
  };
  console.log("Prediction Result:", return_dict);
  return return_dict;
};

module.exports = { predictResult, loadSavedModel };
