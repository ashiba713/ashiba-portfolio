// controllers/portfolioController.js
// Serves all portfolio data from MongoDB

const Project = require('../models/Project');
const Profile = require('../models/Profile');

// GET /api/projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch projects.' });
  }
};

// GET /api/projects/:id
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found.' });
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch project.' });
  }
};

// GET /api/profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ success: false, error: 'Profile not found.' });
    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch profile.' });
  }
};

// GET /api/skills
const getSkills = async (req, res) => {
  try {
    const profile = await Profile.findOne().select('skills');
    if (!profile) return res.status(404).json({ success: false, error: 'Skills not found.' });
    res.status(200).json({ success: true, data: profile.skills });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch skills.' });
  }
};

module.exports = { getProjects, getProjectById, getProfile, getSkills };
