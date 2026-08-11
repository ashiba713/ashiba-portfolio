
// server.js — Render-ready version

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Database disabled for deployment
// const connectDB = require('./config/db');

const portfolioRoutes = require('./routes/portfolioRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ==============================
// SECURITY MIDDLEWARE
// ==============================
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
  })
);

// ==============================
// RATE LIMITING
// ==============================
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      success: false,
      error: 'Too many requests. Try again later.',
    },
  })
);

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: 'Too many messages sent. Try again in an hour.',
  },
});

// ==============================
// BODY PARSING
// ==============================
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ==============================
// STATIC FILES
// ==============================
app.use(express.static(path.join(__dirname, 'public')));

// ==============================
// API ROUTES
// ==============================
app.use('/api', portfolioRoutes);
app.use('/api/contact', contactLimiter, contactRoutes);

// ==============================
// HEALTH CHECK
// ==============================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// ==============================
// FRONTEND ROUTE
// ==============================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==============================
// ERROR HANDLER
// ==============================
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err.message);

  res.status(500).json({
    success: false,
    error: 'Internal server error.',
  });
});

// ==============================
// START SERVER
// ==============================
app.listen(PORT, () => {
  console.log('================================');
  console.log('  Ashiba Portfolio — Server');
  console.log(`  Running on port ${PORT}`);
  console.log(`  ENV: ${process.env.NODE_ENV || 'development'}`);
  console.log('================================');
});
