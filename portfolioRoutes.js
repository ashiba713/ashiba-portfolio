// routes/portfolioRoutes.js — RESTful API for portfolio data

const express = require('express');
const router  = express.Router();
const {
  getProjects,
  getProjectById,
  getProfile,
  getSkills
} = require('../controllers/portfolioController');

// GET /api/projects       — all projects
router.get('/projects', getProjects);

// GET /api/projects/:id   — single project
router.get('/projects/:id', getProjectById);

// GET /api/profile        — full profile data
router.get('/profile', getProfile);

// GET /api/skills         — skills only
router.get('/skills', getSkills);

module.exports = router;
