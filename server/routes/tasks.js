const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Dummy tasks storage
let dummyTasks = [
  {
    _id: '1',
    title: 'Clean up local park',
    description: 'Help clean up the community park by picking up litter and organizing recycling.',
    difficulty: 'easy',
    tokenReward: 10,
    createdBy: '2', // organizer ID
    status: 'open',
    assignedTo: null,
    completedAt: null,
    verifiedAt: null,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    title: 'Food bank volunteer',
    description: 'Sort and package food donations at the local food bank. Requires 4 hours of commitment.',
    difficulty: 'intermediate',
    tokenReward: 25,
    createdBy: '2', // organizer ID
    status: 'open',
    assignedTo: null,
    completedAt: null,
    verifiedAt: null,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Helper function to verify JWT and get user
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dummy-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Dummy users (same as in auth.js)
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

// Find user by ID
const findUserById = (id) => {
  return dummyUsers.find(user => user._id === id);
};

// Helper function to check if user is organizer
const requireOrganizer = (req, res, next) => {
  const user = findUserById(req.userId);
  if (!user || user.role !== 'organizer') {
    return res.status(403).json({ error: 'Organizer access required' });
  }
  next();
};

// @route   GET /api/tasks
// @desc    Get all tasks (filtered by user level for volunteers)
// @access  Private
router.get('/', verifyToken, (req, res) => {
  try {
    const { difficulty, status } = req.query;
    let filteredTasks = [...dummyTasks];

    // Filter by difficulty if specified
    if (difficulty) {
      filteredTasks = filteredTasks.filter(task => task.difficulty === difficulty);
    }

    // Filter by status if specified
    if (status) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }

    // For volunteers, filter by their level
    const user = findUserById(req.userId);
    if (user && user.role === 'volunteer') {
      const levelPermissions = {
        'beginner': ['easy'],
        'intermediate': ['easy', 'intermediate'],
        'advanced': ['easy', 'intermediate', 'difficult']
      };
      
      const allowedDifficulties = levelPermissions[user.level] || ['easy'];
      filteredTasks = filteredTasks.filter(task => allowedDifficulties.includes(task.difficulty));
    }

    res.json({
      tasks: filteredTasks,
      total: filteredTasks.length
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private (Organizer only)
router.post('/', verifyToken, requireOrganizer, (req, res) => {
  try {
    const { title, description, difficulty, deadline } = req.body;

    // Basic validation
    if (!title || !description || !difficulty || !deadline) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!['easy', 'intermediate', 'difficult'].includes(difficulty)) {
      return res.status(400).json({ error: 'Invalid difficulty level' });
    }

    // Check if deadline is in the future
    const deadlineDate = new Date(deadline);
    if (deadlineDate <= new Date()) {
      return res.status(400).json({ error: 'Deadline must be in the future' });
    }

    // Set token reward based on difficulty
    const tokenRewards = {
      'easy': 10,
      'intermediate': 25,
      'difficult': 50
    };

    // Create new task
    const newTask = {
      _id: String(dummyTasks.length + 1),
      title: title.trim(),
      description: description.trim(),
      difficulty,
      tokenReward: tokenRewards[difficulty],
      createdBy: req.userId,
      status: 'open',
      assignedTo: null,
      completedAt: null,
      verifiedAt: null,
      deadline: deadlineDate,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add to dummy tasks array
    dummyTasks.push(newTask);

    res.status(201).json({
      message: 'Task created successfully',
      task: newTask
    });

  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get specific task
// @access  Private
router.get('/:id', verifyToken, (req, res) => {
  try {
    const task = dummyTasks.find(t => t._id === req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// @route   PUT /api/tasks/:id/assign
// @desc    Assign task to volunteer
// @access  Private (Volunteer only)
router.put('/:id/assign', verifyToken, (req, res) => {
  try {
    const task = dummyTasks.find(t => t._id === req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.status !== 'open') {
      return res.status(400).json({ error: 'Task is not available for assignment' });
    }

    if (new Date(task.deadline) <= new Date()) {
      return res.status(400).json({ error: 'Task deadline has passed' });
    }

    // Update task
    task.assignedTo = req.userId;
    task.status = 'in_progress';
    task.updatedAt = new Date();

    res.json({
      message: 'Task assigned successfully',
      task
    });

  } catch (error) {
    console.error('Assign task error:', error);
    res.status(500).json({ error: 'Failed to assign task' });
  }
});

// @route   PUT /api/tasks/:id/complete
// @desc    Mark task as complete
// @access  Private (Assigned volunteer only)
router.put('/:id/complete', verifyToken, (req, res) => {
  try {
    const task = dummyTasks.find(t => t._id === req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.assignedTo !== req.userId) {
      return res.status(403).json({ error: 'You are not assigned to this task' });
    }

    if (task.status !== 'in_progress') {
      return res.status(400).json({ error: 'Task is not in progress' });
    }

    // Update task
    task.status = 'completed';
    task.completedAt = new Date();
    task.updatedAt = new Date();

    res.json({
      message: 'Task marked as complete',
      task
    });

  } catch (error) {
    console.error('Complete task error:', error);
    res.status(500).json({ error: 'Failed to complete task' });
  }
});

// @route   PUT /api/tasks/:id/verify
// @desc    Verify completed task
// @access  Private (Organizer only)
router.put('/:id/verify', verifyToken, requireOrganizer, (req, res) => {
  try {
    const task = dummyTasks.find(t => t._id === req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.status !== 'completed') {
      return res.status(400).json({ error: 'Task is not completed yet' });
    }

    // Update task
    task.status = 'verified';
    task.verifiedAt = new Date();
    task.updatedAt = new Date();

    res.json({
      message: 'Task verified successfully',
      task
    });

  } catch (error) {
    console.error('Verify task error:', error);
    res.status(500).json({ error: 'Failed to verify task' });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private (Organizer only)
router.delete('/:id', verifyToken, requireOrganizer, (req, res) => {
  try {
    const taskIndex = dummyTasks.findIndex(t => t._id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Remove task from array
    dummyTasks.splice(taskIndex, 1);

    res.json({ message: 'Task deleted successfully' });

  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;