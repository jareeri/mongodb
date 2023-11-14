const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  age: { type: Number, required: true },
  time_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', itemSchema);

