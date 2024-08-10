const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/data-endpoint', (req, res) => {
    const time = Date.now();
    const value = Math.random() * 100;
    res.json({time, value});
});

app.get('/GetADC.cgi', (req, res) => {
    values = [];
    for (i = 0; i < 100; i++) {
        const value = Math.random() * 100;
        values.push(value);
    }
    res.json(values);
});

// XXX: We will use the 'http' to handle this task instead
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

// Create an HTTP server and WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Broadcast function to send data to all connected clients
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send new data every 2 seconds
    const interval = setInterval(() => {
        const data = { time: Date.now(), value: Math.random() * 100 };
        broadcast(data);
    }, 2000);

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);  // Stop sending data when client disconnects
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
