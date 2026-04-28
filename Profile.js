// models/Profile.js — MongoDB Schema for profile and skills data

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  tagline: String,
  bio: [String],
  location: String,
  email: String,
  linkedin: String,
  github: String,
  college: String,
  degree: String,
  year: String,
  stats: [{
    num: String,
    label: String
  }],
  skills: [{
    category: String,
    icon: String,
    items: [String]
  }],
  experience: [{
    role: String,
    company: String,
    location: String,
    period: String,
    points: [String]
  }],
  patents: [{
    title: String,
    appNo: String,
    description: String,
    date: String,
    role: String
  }],
  publications: [{
    title: String,
    publisher: String,
    date: String,
    description: String
  }],
  certifications: [{
    org: String,
    name: String
  }],
  awards: [String]
});

module.exports = mongoose.model('Profile', profileSchema);
