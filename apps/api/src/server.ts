import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const http = require('http').createServer(app);
const io = new Server(http);

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';
app.use(cors({ origin: FRONTEND_ORIGIN }));

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

// Serve the repo-level ACTIVITY.md so the web status page can fetch a live activity log
import fs from 'fs';
import path from 'path';

const ACTIVITY_PATH = process.env.ACTIVITY_PATH || path.resolve(process.cwd(), 'ACTIVITY.md');

const activityLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

app.get('/activity', activityLimiter, (req, res) => {
  try {
    const data = fs.readFileSync(ACTIVITY_PATH, 'utf8');
    res.type('text/plain').send(data);
  } catch (err) {
    console.error('Error reading ACTIVITY.md:', err);
    res.status(500).json({ ok: false, error: 'Failed to read activity log' });
  }
});

const PORT = process.env.PORT || 3002;

http.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    
    // Socket.io connection
    io.on('connection', (socket) => {
        console.log('A user connected');
    });
});