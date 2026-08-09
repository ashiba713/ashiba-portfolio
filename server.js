//require('dotenv').config();
const express   = require('express');
const path      = require('path');
const helmet    = require('helmet');
const cors      = require('cors');
const rateLimit = require('express-rate-limit');
// const connectDB = require('./config/db');

// --- Route Imports ---
const portfolioRoutes = require('./routes/portfolioRoutes');
const contactRoutes   = require('./routes/contactRoutes');

const app  = express();
const PORT = process.env.PORT || 3000;

// ==============================
//  CONNECT DATABASE
// ==============================
// connectDB();

const app  = express();
const PORT = process.env.PORT || 3000;

// ==============================
//  CONNECT DATABASE
// ==============================
connectDB();

// ==============================
//  SECURITY MIDDLEWARE
// ==============================
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc:   ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc:    ["'self'", "https://fonts.gstatic.com"],
      scriptSrc:  ["'self'", "'unsafe-inline'"],
      imgSrc:     ["'self'", "data:", "https:"]
    }
  }
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://ashiba713.github.io', 'https://ashiba-portfolio.onrender.com']
    : '*',
  methods: ['GET', 'POST']
}));

// ==============================
//  RATE LIMITING
// ==============================
// Global limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, error: 'Too many requests. Try again later.' }
}));

// Stricter limiter for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { success: false, error: 'Too many messages sent. Try again in an hour.' }
});

// ==============================
//  BODY PARSING
// ==============================
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ==============================
//  STATIC FILES (Frontend)
// ==============================
app.use(express.static(path.join(__dirname, 'public')));

// ==============================
//  API ROUTES
// ==============================
app.use('/api', portfolioRoutes);
app.use('/api/contact', contactLimiter, contactRoutes);

// ==============================
//  HEALTH CHECK
// ==============================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// ==============================
//  SERVE FRONTEND (catch-all)
// ==============================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==============================
//  ERROR HANDLER
// ==============================
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err.message);
  res.status(500).json({ success: false, error: 'Internal server error.' });
});

// ==============================
//  START SERVER
// ==============================
app.listen(PORT, () => {
  console.log('================================');
  console.log('  Ashiba Portfolio — Server');
  console.log(`  http://localhost:${PORT}`);
  console.log(`  ENV: ${process.env.NODE_ENV || 'development'}`);
  console.log('================================');
});
