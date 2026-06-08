require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    const Project = require('./models/Project');
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany([
        { title: 'Attendify', description: 'Smart attendance system using QR codes and face recognition. Built with MongoDB Atlas, Firebase, Redis, Node.js/Express for SCETATHON 2026.', tech: ['Node.js', 'MongoDB', 'Firebase', 'Redis'], link: '#', order: 1 },
        { title: 'Personal Portfolio', description: 'Full-stack portfolio with Node.js, Express, MongoDB, and HTML/CSS/JS. Dark editorial aesthetic with dynamic project loading.', tech: ['HTML/CSS/JS', 'Node.js', 'Express', 'MongoDB'], link: '#', order: 2 },
        { title: 'UGC Creator Portfolio', description: 'Professional UGC portfolio for skincare brands with rate card and pricing tiers. Operating as @digitalessence.e.', tech: ['HTML', 'CSS', 'UGC', 'Instagram'], link: '#', order: 3 },
        { title: 'Android App', description: 'Android app using Jetpack Compose and XML UI with Material Design and local database.', tech: ['Android Studio', 'Jetpack Compose', 'Java'], link: '#', order: 4 }
      ]);
      console.log('🌱 Projects seeded');
    }
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB error:', err.message);
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  });