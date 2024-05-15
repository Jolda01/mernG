const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String },
  completed: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  tasks: [taskSchema] // Embedding tasks within the user schema
});

const User = mongoose.model('User', userSchema);

module.exports = User;
