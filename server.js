const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to videos.json
const videosJsonPath = path.join(__dirname, 'public', 'videos.json');

// GET /api/videos.json - Serve the videos.json file
app.get('/api/videos.json', (req, res) => {
  try {
    const data = fs.readFileSync(videosJsonPath, 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    console.error('Error reading videos.json:', error);
    res.status(500).json({ error: 'Failed to load videos.json' });
  }
});

// PUT /api/videos.json - Update the videos.json file
app.put('/api/videos.json', (req, res) => {
  try {
    const newData = req.body;
    fs.writeFileSync(videosJsonPath, JSON.stringify(newData, null, 4), 'utf8');
    console.log('videos.json updated successfully');
    res.json({ message: 'Videos.json updated successfully' });
  } catch (error) {
    console.error('Error updating videos.json:', error);
    res.status(500).json({ error: 'Failed to update videos.json' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Videos.json endpoint: http://localhost:${PORT}/api/videos.json`);
});
