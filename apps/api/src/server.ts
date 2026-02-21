import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const http = require('http').createServer(app);
const io = new Server(http);

app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

const PORT = process.env.PORT || 3001;

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
    // Socket.io connection
    io.on('connection', (socket) => {
        console.log('A user connected');
    });
});