// routes/contactRoutes.js

const express = require('express');
const router  = express.Router();
const { submitContact, getMessages } = require('../controllers/contactController');

// POST /api/contact  — submit contact form
router.post('/', submitContact);

// GET  /api/messages — view all messages (admin)
router.get('/messages', getMessages);

module.exports = router;
