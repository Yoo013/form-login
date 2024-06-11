// src/controllers/user.controller.js
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a User model

// Example user signup route
router.post('/signup', async (req, res) => {
  try {
    const { first_Name, last_Name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ first_Name, last_Name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during user signup:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
