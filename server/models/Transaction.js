const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    default: null
  },
  tokensEarned: {
    type: Number,
    required: [true, 'Token amount is required']
  },
  transactionType: {
    type: String,
    enum: ['earned', 'redeemed'],
    required: [true, 'Transaction type is required']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  // Placeholder for future blockchain integration
  blockchainTxHash: {
    type: String,
    default: null
  },
  // Additional metadata for blockchain compatibility
  blockchainNetwork: {
    type: String,
    default: null // Will be 'polygon' when blockchain is integrated
  },
  contractAddress: {
    type: String,
    default: null // Will store smart contract address
  }
});

// Instance method to format transaction for display
transactionSchema.methods.toDisplayJSON = function() {
  return {
    _id: this._id,
    tokensEarned: this.tokensEarned,
    transactionType: this.transactionType,
    description: this.description,
    timestamp: this.timestamp,
    taskId: this.taskId,
    blockchainTxHash: this.blockchainTxHash
  };
};

// Static method to get user transaction history
transactionSchema.statics.getUserHistory = function(userId, limit = 50) {
  return this.find({ userId })
    .populate('taskId', 'title difficulty')
    .sort({ timestamp: -1 })
    .limit(limit);
};

// Static method to calculate user total tokens
transactionSchema.statics.calculateUserTokens = async function(userId) {
  const result = await this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$transactionType',
        total: { $sum: '$tokensEarned' }
      }
    }
  ]);
  
  let earned = 0;
  let redeemed = 0;
  
  result.forEach(item => {
    if (item._id === 'earned') earned = item.total;
    if (item._id === 'redeemed') redeemed = item.total;
  });
  
  return earned - redeemed;
};

// Indexes for performance
transactionSchema.index({ userId: 1 });
transactionSchema.index({ taskId: 1 });
transactionSchema.index({ transactionType: 1 });
transactionSchema.index({ timestamp: -1 });
transactionSchema.index({ userId: 1, timestamp: -1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;