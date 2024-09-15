// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Login function
async function loginUser(req, res) {
    const { email, password } = req.body;
    console.log(email, password)
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        console.log("user not found")
        return res.status(404).json({ message: 'User not found' });
      }
      console.log("user found")
  
      // Compare provided password with the hashed password in the database
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role }, // Payload
        JWT_SECRET, // Secret key
        { expiresIn: '1h' } // Token expiry
      );
  
      // Return token and user info
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

// User registration function
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = { registerUser, loginUser };
