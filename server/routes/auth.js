const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Dummy users for testing
const dummyUsers = [
  {
    _id: '1',
    email: 'volunteer@test.com',
    password: 'password123',
    username: 'TestVolunteer',
    role: 'volunteer',
    level: 'beginner',
    totalTokens: 50,
    tasksCompleted: 3,
    createdAt: new Date()
  },
  {
    _id: '2',
    email: 'organizer@test.com',
    password: 'password123',
    username: 'TestOrganizer',
    role: 'organizer',
    level: 'advanced',
    totalTokens: 0,
    tasksCompleted: 0,
    createdAt: new Date()
  }
];

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'dummy-secret-key',
    { expiresIn: '24h' }
  );
};

// Find user by email
const findUserByEmail = (email) => {
  return dummyUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Find user by ID
const findUserById = (id) => {
  return dummyUsers.find(user => user._id === id);
};

// @route   POST /api/auth/register
// @desc    Register a new user (dummy implementation)
// @access  Public
router.post('/register', (req, res) => {
  try {
    const { email, password, username, role } = req.body;

    // Basic validation
    if (!email || !password || !username || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    if (!['organizer', 'volunteer'].includes(role)) {
      return res.status(400).json({ error: 'Role must be organizer or volunteer' });
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new dummy user
    const newUser = {
      _id: String(dummyUsers.length + 1),
      email: email.toLowerCase(),
      username,
      role,
      level: 'beginner',
      totalTokens: 0,
      tasksCompleted: 0,
      createdAt: new Date()
    };

    // Add to dummy users array
    dummyUsers.push(newUser);

    // Generate JWT token
    const token = generateToken(newUser._id);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user (dummy implementation)
// @access  Public
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password (simple string comparison for dummy)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// @route   GET /api/auth/profile
// @desc    Get current user profile (dummy implementation)
// @access  Private
router.get('/profile', (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dummy-secret-key');
    const user = findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token - user not found' });
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', (req, res) => {
  // In a JWT system, logout is typically handled client-side
  // by removing the token from storage
  res.json({ message: 'Logout successful' });
});

module.exports = router;