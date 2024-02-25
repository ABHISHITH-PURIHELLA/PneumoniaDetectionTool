/*const { spawn } = require('child_process');

// Function to call the Python script and get the prediction
//imagePath = "C:/Users/purih/Downloads/NORMAL2-IM-1427-0001.jpeg"
function predictResult(imagePath, modelPath = 'resnet152v2_feature_extraction_final_best_model') {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['./predictResult.py', imagePath, modelPath]);

    let dataString = '';
    pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`Python script exited with code ${code}`));
      }
      try {
        const result = JSON.parse(dataString);
        resolve(result);
      } catch (error) {
        reject(new Error('Failed to parse Python script output'));
      }
    });
  });
}*/

const { spawn } = require('child_process');

const predictResult = (imagePath) => {
  return new Promise((resolve, reject) => {
    const process = spawn('python', ['predictResult.py', imagePath]);

    let dataStr = '';
    process.stdout.on('data', (data) => {
      dataStr += data.toString();
    });

    process.on('close', (code) => {
      if (code !== 0) {
        reject(new Error('Python script exited with code ' + code));
        return;
      }

      try {
        const result = JSON.parse(dataStr);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
};

