const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Task description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'intermediate', 'difficult'],
    required: [true, 'Difficulty level is required']
  },
  tokenReward: {
    type: Number,
    required: true,
    min: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Task creator is required']
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'completed', 'verified', 'expired'],
    default: 'open'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  },
  verifiedAt: {
    type: Date,
    default: null
  },
  deadline: {
    type: Date,
    required: [true, 'Task deadline is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Deadline must be in the future'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
taskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Automatically set token reward based on difficulty
taskSchema.pre('save', function(next) {
  if (this.isModified('difficulty') || this.isNew) {
    const rewardMap = {
      'easy': 10,
      'intermediate': 25,
      'difficult': 50
    };
    this.tokenReward = rewardMap[this.difficulty];
  }
  next();
});

// Instance method to check if task can be assigned to user
taskSchema.methods.canBeAssignedTo = function(user) {
  // Check if task is open
  if (this.status !== 'open') return false;
  
  // Check if deadline has passed
  if (this.deadline < new Date()) return false;
  
  // Check user level permissions
  const levelPermissions = {
    'beginner': ['easy'],
    'intermediate': ['easy', 'intermediate'],
    'advanced': ['easy', 'intermediate', 'difficult']
  };
  
  return levelPermissions[user.level].includes(this.difficulty);
};

// Static method to get tasks available for user
taskSchema.statics.getAvailableForUser = function(user) {
  const levelPermissions = {
    'beginner': ['easy'],
    'intermediate': ['easy', 'intermediate'],
    'advanced': ['easy', 'intermediate', 'difficult']
  };
  
  return this.find({
    status: 'open',
    difficulty: { $in: levelPermissions[user.level] },
    deadline: { $gt: new Date() }
  }).populate('createdBy', 'username');
};

// Indexes for performance
taskSchema.index({ status: 1 });
taskSchema.index({ difficulty: 1 });
taskSchema.index({ createdBy: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ deadline: 1 });
taskSchema.index({ createdAt: -1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;