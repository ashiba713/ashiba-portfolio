const express = require('express');
const router = express.Router();

// Temporary simple response
router.get('/projects', (req, res) => {
  res.json([]);
});

router.get('/profile', (req, res) => {
  res.json({
    name: 'Ashiba Alben A',
    role: 'AI & Data Science Engineer',
  });
});

router.get('/skills', (req, res) => {
  res.json([]);
});

module.exports = router;
