import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const http = require('http').createServer(app);
const io = new Server(http);

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';
app.use(cors({ origin: FRONTEND_ORIGIN }));

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

const PORT = process.env.PORT || 3001;

http.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    
    // Socket.io connection
    io.on('connection', (socket) => {
        console.log('A user connected');
    });
});