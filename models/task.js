const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Users',
//     required: true,
//   },
});

module.exports = mongoose.model('Task', taskSchema);
