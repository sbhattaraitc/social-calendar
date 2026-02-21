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

// Serve the repo-level ACTIVITY.md so the web status page can fetch a live activity log
import fs from 'fs';
import path from 'path';

app.get('/activity', (req, res) => {
  const activityPath = '/home/saugat/app/social-calendar/ACTIVITY.md';
  fs.readFile(activityPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ ok: false, error: 'Failed to read activity log' });
      return;
    }
    res.type('text/plain').send(data);
  });
});

const PORT = process.env.PORT || 3002;

http.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    
    // Socket.io connection
    io.on('connection', (socket) => {
        console.log('A user connected');
    });
});