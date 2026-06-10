require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const meetingRoutes = require('./routes/meetings');
const livekitRoutes = require('./routes/livekit');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests without origin (same-origin requests)
    // or from allowed development origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  }
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/livekit', livekitRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ZMM Backend Running ✅' }));

// Serve frontend static files
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`ZMM Backend running on http://localhost:${PORT}`));
