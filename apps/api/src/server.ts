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
  try {
    const data = fs.readFileSync(activityPath, 'utf8');
    res.type('text/plain').send(data);
  } catch (err) {
    console.error('Error reading ACTIVITY.md:', err);
    res.status(500).json({ ok: false, error: 'Failed to read activity log' });
  }
});

// Debug endpoint: report fs checks so we can see why reading fails
app.get('/activity-debug', (req, res) => {
  const activityPath = '/home/saugat/app/social-calendar/ACTIVITY.md';
  try {
    const exists = fs.existsSync(activityPath);
    const stat = exists ? fs.statSync(activityPath) : null;
    res.json({ exists, stat });
  } catch (err) {
    console.error('Debug read error:', err);
    res.status(500).json({ ok: false, error: 'Debug read failed' });
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