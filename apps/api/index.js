const express = require('express');
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('Hello from API!');
});

io.on('connection', (socket) => {
  console.log('A user connected');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
