const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Session Schema
const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  workSessions: Number,
  completedCycles: Number
});

const Session = mongoose.model('Session', sessionSchema);

// Auth helpers
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });
    res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ sub: user._id.toString() }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post('/api/sessions', authMiddleware, async (req, res) => {
  try {
    const { workSessions, completedCycles } = req.body;
    const session = new Session({
      userId: req.user.id,
      workSessions,
      completedCycles
    });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/sessions', authMiddleware, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id })
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
