// const express = require('express');
// const app = express();
// const path = require('path');

// app.use(express.static(__dirname)); // Serve files from the current directory

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'show_pin_location.html')); // Replace 'test.html' with your HTML file's name
// });

// app.listen(4000, () => {
//   console.log('Server is running on port 4000');
// });

const express = require('express');
const http = require('http');
const WebSocket = require('ws');


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    const { latitude, longitude } = data;

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ latitude, longitude }));

        // Send a custom event directly to the HTML file
        client.send(JSON.stringify({ type: 'update-map', data: { latitude, longitude } }));
      }
    });
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Serve your HTML page
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/show_pin_location.html');
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
