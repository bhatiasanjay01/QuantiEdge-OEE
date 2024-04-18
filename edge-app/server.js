// server.js (Node.js backend)
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const port = 3001;

// Add CORS middleware
app.use(cors());

app.post('/calculate-oee', (req, res) => {
  const pythonProcess = spawn('python3', ['/Users/Sanjay.Bhatia/Documents/QuantiEdge_Code/edge-app/src/main_oee.py']);

  let responseData = '';

  pythonProcess.stdout.on('data', (data) => {
    responseData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    // Handle errors here
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    // Send the response once the process finishes
    res.send({ result: responseData });
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
