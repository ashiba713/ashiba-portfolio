// models/Project.js — MongoDB Schema for portfolio projects

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  tag: {
    type: String,
    required: true
  },
  stack: [{
    type: String,
    trim: true
  }],
  githubUrl: {
    type: String,
    default: 'https://github.com/ashiba713'
  },
  liveUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Project', projectSchema);
