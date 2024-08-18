const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const config = require('../config/keys')
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;

  // Validate input
  if (!name || !email || !password || !password2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if passwords match
  if (password !== password2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    // Create and save the new user
    const user = new User({ username: name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sign in user
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id },  config.jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ message: 'Sign in successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sign out user (Client-side action)
router.post('/signout', (req, res) => {
  // Invalidate the token on the client side
  // Here we simply acknowledge the sign-out request
  res.status(200).json({ message: 'Sign out successful' });
});




module.exports = router;
 
