// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
