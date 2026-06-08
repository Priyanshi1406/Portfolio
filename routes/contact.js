const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST — save contact message to MongoDB
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    // Optional: send email notification via nodemailer
    // (configure in .env: EMAIL_USER, EMAIL_PASS, EMAIL_TO)
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransport({ ... });
    // await transporter.sendMail({ ... });

    res.status(201).json({ success: true, message: 'Message received!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all messages (admin)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
