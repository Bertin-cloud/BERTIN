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
const buildPath = path.join(__dirname, '../frontend/build');
console.log('Serving static files from:', buildPath);

app.use(express.static(buildPath));

// Fallback to index.html for React Router (SPA routing)
app.get('*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  console.log('Serving index.html for route:', req.path);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Server error - build files not found');
    }
  });
});

const PORT = process.env.PORT || 4000;

// Log environment status for debugging
console.log('Environment Check:');
console.log('- PORT:', PORT);
console.log('- LIVEKIT_URL:', process.env.LIVEKIT_URL ? '✓ Set' : '✗ Missing');
console.log('- LIVEKIT_API_KEY:', process.env.LIVEKIT_API_KEY ? '✓ Set' : '✗ Missing');
console.log('- LIVEKIT_API_SECRET:', process.env.LIVEKIT_API_SECRET ? '✓ Set' : '✗ Missing');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? '✓ Set' : '✗ Missing');

app.listen(PORT, () => {
  console.log(`ZMM Backend running on http://localhost:${PORT}`);
});
