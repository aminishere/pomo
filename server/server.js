const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pomodoro';
mongoose.connect(uri)
  .then(() => console.log('MongoDB connection established'))
  .catch(err => console.log('MongoDB connection error:', err));

// Session Schema
const sessionSchema = new mongoose.Schema({
  userId: String,
  date: { type: Date, default: Date.now },
  workSessions: Number,
  completedCycles: Number
});

const Session = mongoose.model('Session', sessionSchema);

// Routes
app.post('/api/sessions', async (req, res) => {
  try {
    const { workSessions, completedCycles } = req.body;
    const session = new Session({
      userId: 'default', // You can implement user authentication later
      workSessions,
      completedCycles
    });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/sessions', async (req, res) => {
  try {
    const sessions = await Session.find({ userId: 'default' })
      .sort({ date: -1 })
      .limit(7); // Get last 7 days of sessions
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
