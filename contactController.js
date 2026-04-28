// controllers/contactController.js
// Handles contact form submissions — validation, DB save, email

const Contact    = require('../models/Contact');
const nodemailer = require('nodemailer');

// Build email transporter (Gmail)
const getTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

// POST /api/contact
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // --- Backend Validation ---
    const errors = [];
    if (!name    || name.trim().length < 2)    errors.push('Name must be at least 2 characters.');
    if (!email   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required.');
    if (!subject || subject.trim().length < 3)  errors.push('Subject must be at least 3 characters.');
    if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters.');
    if (message  && message.trim().length > 2000) errors.push('Message too long (max 2000 chars).');

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // --- Save to MongoDB ---
    const contact = await Contact.create({
      name:    name.trim(),
      email:   email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    });
    console.log(`📬 New message saved — ID: ${contact._id} | From: ${name} <${email}>`);

    // --- Send Email Notification ---
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = getTransporter();
        await transporter.sendMail({
          from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to:      process.env.EMAIL_USER,
          subject: `[Portfolio] ${subject} — from ${name}`,
          html: `
            <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: auto;
                        padding: 2rem; border: 1px solid #e0ddd8; border-radius: 12px;">
              <h2 style="color: #1a5276; font-size: 1.3rem; margin-bottom: 1.5rem;">
                New Portfolio Message
              </h2>
              <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #888; width: 80px; vertical-align: top;">Name</td>
                  <td style="padding: 8px 0; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888; vertical-align: top;">Email</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${email}" style="color: #1a5276;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888; vertical-align: top;">Subject</td>
                  <td style="padding: 8px 0;">${subject}</td>
                </tr>
              </table>
              <div style="margin-top: 1.5rem; padding: 1rem; background: #f9f9f7;
                          border-radius: 8px; font-size: 14px; line-height: 1.7; color: #333;">
                ${message.replace(/\n/g, '<br>')}
              </div>
              <p style="margin-top: 1.5rem; font-size: 11px; color: #aaa;">
                Sent via Portfolio Contact Form · Ashiba Alben A · ID: ${contact._id}
              </p>
            </div>
          `
        });
        console.log('📧 Email notification sent to', process.env.EMAIL_USER);
      } catch (emailErr) {
        // Email failure should not fail the whole request — message is already saved
        console.error('⚠️  Email send failed (message still saved):', emailErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Your message was sent successfully!'
    });

  } catch (err) {
    console.error('❌ Contact controller error:', err);
    return res.status(500).json({
      success: false,
      errors: ['Server error. Please try again later.']
    });
  }
};

// GET /api/messages  (admin — view all submissions)
const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, errors: ['Failed to fetch messages.'] });
  }
};

module.exports = { submitContact, getMessages };
