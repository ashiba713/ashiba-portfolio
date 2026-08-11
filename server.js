
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// ==============================
// SECURITY
// ==============================
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());

// ==============================
// RATE LIMITING
// ==============================
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// ==============================
// BODY PARSER
// ==============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// STATIC FILES
// Your index.html is in the ROOT folder
// ==============================
app.use(express.static(__dirname));

// ==============================
// SIMPLE API ROUTES
// ==============================
app.get('/api/projects', (req, res) => {
  res.json([]);
});

app.get('/api/profile', (req, res) => {
  res.json({
    name: 'Ashiba Alben A',
    role: 'AI & Data Science Engineer',
  });
});

app.get('/api/skills', (req, res) => {
  res.json([]);
});

app.post('/api/contact', (req, res) => {
  res.json({
    success: true,
    message: 'Message received successfully',
  });
});

// ==============================
// HEALTH CHECK
// ==============================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
  });
});

// ==============================
// FRONTEND
// ==============================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ==============================
// START SERVER
// ==============================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

