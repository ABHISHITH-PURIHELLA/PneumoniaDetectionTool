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
  const pythonEnvPath = 'C:/Users/purih/OneDrive/Desktop/Project_597/myproject/Scripts/python.exe'
  return new Promise((resolve, reject) => {
    const process = spawn(pythonEnvPath, ['predictResult.py', imagePath]);

    let dataStr = '';
    /*process.stdout.on('data', (data) => {
      dataStr += data.toString();
    });*/
    process.stdout.on('data', (data) => {
      dataStr += data.toString();
      
    });
    
    process.stderr.on('data', (data) => {
      console.error(`stderr: ${data.toString()}`);
    });
    

    process.on('close', (code) => {
      console.log(`Python script exited with code ${code}`);
      if (code !== 0) {
        reject(new Error('Python script exited with code ' + code));
        return;
      }
      //console.log('Received Data:', dataStr);
      dataStr = dataStr.trim();
      console.log("Final data string:", dataStr);
      /*if (dataStr.startsWith('"') && dataStr.endsWith('"')) {
        dataStr = dataStr.substring(1, dataStr.length - 1); // Remove the extra quotes
        dataStr = dataStr.replace(/\\"/g, '"'); // Unescape double quotes
      }*/
      // Assuming JSON starts with '{' and ends with '}'
      const jsonStartIndex = dataStr.lastIndexOf('{');
      if (jsonStartIndex === -1) {
        reject(new Error('No JSON object found in Python script output'));
        return;
       }

    // Extract the JSON substring
      let jsonString = dataStr.substring(jsonStartIndex);
      console.log("Extracted JSON string:", jsonString);
      console.log("Processed data string for JSON parsing:", dataStr);
      try {
        const result = JSON.parse(jsonString);
        resolve(result);
      } catch (error) {
        reject(new Error('Failed to parse Python script output: ' + error.message));
      }
    });
  });
};

module.exports = { predictResult };